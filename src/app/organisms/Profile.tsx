/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { GithubProfileDto } from '../interfaces/GitHubProfile';
import Spinner from '../atoms/Spinner';
import LogColumns from '../constants/LogColumns';
import Table from '../molecules/Table';
import ContentBlock from '../molecules/ContentBlock';
import PageCounter from '../atoms/PageCounter';
import Pagination from '../atoms/Pagination';
import { IEvent } from '../interfaces/Event';
import HttpErrorAlert from '../atoms/HttpErrorAlert';
import { CernProfileDto } from '../interfaces/CernProfile';
import { fetchProfile } from '../redux/ducks/auth/operations';
import { store } from '../redux/configureStore';
import { selectProfile, selectIsFetchingProfile } from '../redux/ducks/auth/selectors';
import { setFiltersFromUrl, switchOrderBy } from '../redux/ducks/filter/operations';
import { FilterName } from '../interfaces/Filter';
import { selectQueryString, selectFilters } from '../redux/ducks/filter/selectors';
import { setQueryParams } from '../utility/UrlUtil';
import { setFilter } from '../redux/ducks/filter/actions';
import { OrderDirection } from '../enums/OrderDirection';
import { fetchLogsForUser } from '../redux/ducks/user/operations';
import { selectIsFetchingUserLogs, selectUserLogs, selectUserLogCount } from '../redux/ducks/user/selectors';
import Label from '../atoms/Label';
import Select from '../atoms/Select';
import { PAGE_SIZES } from '../constants/constants';

interface Attrs {
    userId: number;
}

type Vnode = m.Vnode<Attrs, Profile>;
type VnodeDOM = m.VnodeDOM<Attrs, Profile>;

export default class Profile extends MithrilTsxComponent<Attrs> {

    oninit(vnode: VnodeDOM) {
        store.dispatch(fetchProfile());
        store.dispatch(setFiltersFromUrl(FilterName.UserLog));
        this.setQueryAndFetch(vnode.attrs.userId);
    }

    /**
     * Fetch logs made by the user, with the filters currently in the state.
     */
    fetchLogsWithFilters = (id: number): void => {
        const queryString = selectQueryString(store.getState())(FilterName.UserLog);
        store.dispatch(fetchLogsForUser(id, queryString));
    }

    /**
     * Set the query parameters in the url and fetch with the filters in the current state.
     */
    setQueryAndFetch = (id: number): void => {
        const userLogFilters = selectFilters(store.getState())[FilterName.UserLog];
        setQueryParams(userLogFilters);
        this.fetchLogsWithFilters(id);
    }

    view(vnode: Vnode) {
        const isCernProfile = localStorage.getItem('USE_CERN_SSO') === 'true';
        const profile = selectProfile(store.getState());
        const { userId } = vnode.attrs;
        const userLogFilters = selectFilters(store.getState())[FilterName.UserLog];
        return (
            <HttpErrorAlert>
                <Spinner isLoading={selectIsFetchingProfile(store.getState())}>
                    <div>
                        {profile &&
                            <div class="card" style="width: 18rem;">
                                <img
                                    class="card-img-top"
                                    src={isCernProfile
                                        ? '/assets/img/user.png'
                                        : (profile as GithubProfileDto).profileData.avatar_url}
                                    alt="Card image cap"
                                />
                                <div class="card-body">
                                    <h5 class="card-title m-0">{profile.profileData.name}</h5>
                                    <p class="card-text">{isCernProfile
                                        ? (profile as CernProfileDto).profileData.username
                                        : (profile as GithubProfileDto).profileData.login}</p>
                                    {!isCernProfile
                                        ? <a
                                            href={(profile as GithubProfileDto).profileData.html_url}
                                            target="_blank"
                                            class="btn btn-outline-success"
                                        >
                                            GitHub profile
                                        </a>
                                        : ''}
                                </div>
                            </div>
                        }
                    </div>
                    <div class="mt-2"><h2>My logs</h2></div>
                    <Spinner
                        isLoading={selectIsFetchingUserLogs(store.getState())}
                    >
                        <div class="collapse-transition">
                            <Table
                                data={selectUserLogs(store.getState()) || []}
                                columns={LogColumns}
                                orderBy={userLogFilters.orderBy || undefined}
                                orderDirection={userLogFilters.orderDirection || OrderDirection.Descending}
                                onHeaderClick={(accessor: string) => {
                                    store.dispatch(switchOrderBy(FilterName.UserLog, accessor));
                                    this.setQueryAndFetch(userId);
                                }}
                            />
                        </div>
                    </Spinner>
                    <ContentBlock padding={1} >
                        <div class="row">
                            <div class="col-md-4 m-1 small-center" >
                                <div class="pagination-block">
                                    <Label
                                        id="pageSize"
                                        className="col-form-label col-form-label-sm mr-2"
                                        text="Page size"
                                    />
                                </div>
                                <div class="pagination-block">
                                    <Select
                                        id="pageSize"
                                        style="min-width: 75px; max-width: 75px; overflow: hidden;"
                                        className="form-control form-control-sm"
                                        name="pageSize"
                                        oninput={(event: IEvent) => {
                                            store.dispatch(
                                                setFilter(FilterName.UserLog, 'pageSize', event.target.value)
                                            );
                                            store.dispatch(setFilter(FilterName.UserLog, 'pageNumber', 1));
                                            this.setQueryAndFetch(userId);
                                        }}
                                        defaultOption={userLogFilters.pageSize}
                                        options={PAGE_SIZES}
                                    />
                                </div>
                                <div class="text-muted mt-2 ml-2 pagination-block">
                                    <PageCounter
                                        currentPage={userLogFilters.pageNumber}
                                        rowsInTable={userLogFilters.pageSize}
                                        totalCount={selectUserLogCount(store.getState())}
                                    />
                                </div>
                            </div>
                            <div class="col-md-4 m-1 small-center">
                                <Pagination
                                    currentPage={userLogFilters.pageNumber}
                                    numberOfPages={Math.ceil(selectUserLogCount(store.getState())
                                        / userLogFilters.pageSize)}
                                    onChange={(newPage: number) => {
                                        store.dispatch(setFilter(FilterName.UserLog, 'pageNumber', newPage));
                                        this.setQueryAndFetch(userId);
                                    }}
                                />
                            </div>
                        </div>
                    </ContentBlock>
                </Spinner>
            </HttpErrorAlert >
        );
    }
}
