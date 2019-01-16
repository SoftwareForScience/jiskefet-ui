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
import State from '../models/State';
import Spinner from '../components/Spinner';
import LogColumns from '../constants/LogColumns';
import Table from '../components/Table';
import ContentBlock from '../components/ContentBlock';
import PageCounter from '../components/PageCounter';
import Pagination from '../components/Pagination';
import { Event } from '../interfaces/Event';
import { createDummyTable } from '../utility/DummyService';
import HttpErrorAlert from '../components/HttpErrorAlert';
import { CernProfileDto } from '../interfaces/CernProfile';
import { fetchProfile } from '../redux/ducks/auth/operations';
import { store } from '../redux/configureStore';
import { selectProfile, selectIsFetchingProfile } from '../redux/ducks/auth/selectors';

interface Attrs {
    userId: number;
}

type Vnode = m.Vnode<Attrs, Profile>;
type VnodeDOM = m.VnodeDOM<Attrs, Profile>;

export default class Profile extends MithrilTsxComponent<Attrs> {

    async oninit(vnode: VnodeDOM) {
        store.dispatch(fetchProfile());
        State.UserModel.fetchLogs(vnode.attrs.userId);
        await State.FilterModel.setFiltersToDefaults('userLog');
        await State.FilterModel.setFiltersFromUrl('userLog');
        this.fetchLogsforUser(vnode.attrs.userId, State.FilterModel.getQueryString('userLog'));
    }

    /**
     * Fetch logs with the query param given.
     */
    fetchLogsforUser = (id: number, queryParam: string): void => {
        State.UserModel.fetchLogs(id, queryParam);
    }

    /**
     * Fetch logs with the filters currently in the state (in FilterModel).
     */
    fetchLogsWithFilterOptions = (id: number): void => {
        this.fetchLogsforUser(id, State.FilterModel.getQueryString('userLog'));
    }

    view(vnode: Vnode) {
        const pageSizes = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
        const isCernProfile = process.env.USE_CERN_SSO === 'true';
        const profile = selectProfile(store.getState());
        const { userId } = vnode.attrs;
        return (
            <HttpErrorAlert>
                <Spinner isLoading={selectIsFetchingProfile(store.getState())}>
                    <div>
                        {profile &&
                            <div class="card" style="width: 18rem;">
                                <img
                                    class="card-img-top"
                                    src={isCernProfile
                                        ? 'https://via.placeholder.com/300'
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
                        isLoading={State.UserModel.isFetchingLogs}
                        component={createDummyTable(State.FilterModel.getFilters('userLog').pageSize, LogColumns)}
                    >
                        <div class="collapse-transition">
                            <Table
                                data={State.UserModel.logs || []}
                                columns={LogColumns}
                                orderBy={State.FilterModel.getFilters('userLog').orderBy}
                                orderDirection={State.FilterModel.getFilters('userLog').orderDirection}
                                onHeaderClick={(accessor: string) => {
                                    State.FilterModel.switchOrderBy('userLog', accessor);
                                    this.fetchLogsWithFilterOptions(userId);
                                }}
                            />
                        </div>
                    </Spinner>
                    <ContentBlock padding={1} >
                        <div class="row">
                            <div class="col-md-4 m-1 small-center" >
                                <div class="pagination-block">
                                    <label
                                        for="pageSize"
                                        class="col-form-label col-form-label-sm mr-2"
                                    >
                                        Page size
                                    </label>
                                </div>
                                <div class="pagination-block">
                                    <select
                                        id="pageSize"
                                        style="min-width: 75px; max-width: 75px; overflow: hidden;"
                                        class="form-control form-control-sm"
                                        name="pageSize"
                                        onchange={(event: Event) => {
                                            State.FilterModel.setFilter('userLog', 'pageSize', event.target.value);
                                            State.FilterModel.setFilter('userLog', 'pageNumber', 1);
                                            this.fetchLogsWithFilterOptions(userId);
                                        }}
                                        value={State.FilterModel.getFilters('userLog').pageSize}
                                    >
                                        {pageSizes.map((pageSize: number) =>
                                            // tslint:disable-next-line:jsx-key
                                            <option value={pageSize}>{pageSize}</option>
                                        )}
                                    </select>
                                </div>
                                <div class="text-muted mt-2 ml-2 pagination-block">
                                    <PageCounter
                                        currentPage={State.FilterModel.getFilters('userLog').pageNumber}
                                        rowsInTable={State.FilterModel.getFilters('userLog').pageSize}
                                        totalCount={State.UserModel.logCount}
                                    />
                                </div>
                            </div>
                            <div class="col-md-4 m-1 small-center">
                                <Pagination
                                    currentPage={State.FilterModel.getFilters('userLog').pageNumber}
                                    numberOfPages={Math.ceil(State.UserModel.logCount
                                        / State.FilterModel.getFilters('userLog').pageSize)}
                                    onChange={(newPage: number) => {
                                        State.FilterModel.setFilter('userLog', 'pageNumber', newPage);
                                        this.fetchLogsWithFilterOptions(userId);
                                    }}
                                />
                            </div>
                        </div>
                    </ContentBlock>
                </Spinner>
            </HttpErrorAlert>
        );
    }
}
