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

type Vnode = m.Vnode<{}, Profile>;

export default class Profile extends MithrilTsxComponent<{}> {

    async oninit() {
        await State.AuthModel.fetchProfile();
        if (State.AuthModel.profile !== null) {
            await State.UserModel.fetchById(State.AuthModel.profile.id);
            await State.UserModel.fetchLogs(State.UserModel.current.userId);
            State.FilterModel.setFiltersToDefaults('userLogs');
            State.FilterModel.setFiltersFromUrl('userLogs');
            this.fetch(State.FilterModel.getQueryString('userLogs'));
        }
    }

    /**
     * Fetch logs with the query param given.
     */
    fetch = (id: number = State.UserModel.current.userId, queryParam: string = ''): void => {
        State.UserModel.fetchLogs(id, queryParam);
    }

    /**
     * Fetch logs with the filters currently in the state (in FilterModel).
     */
    fetchWithFilters = (): void => {
        this.fetch(State.FilterModel.getQueryString('userLogs'));
    }

    view(vnode: Vnode) {
        const pageSizes = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
        const profile = State.AuthModel.profile as GithubProfileDto;
        return (
            <Spinner isLoading={State.AuthModel.isFetchingProfile}>
                <div>
                    {profile &&
                        <div class="card" style="width: 18rem;">
                            <img
                                class="card-img-top"
                                src={profile.avatar_url}
                                alt="Card image cap"
                            />
                            <div class="card-body">
                                <h5 class="card-title m-0">{profile.name}</h5>
                                <p class="card-text">{profile.login}</p>
                                <a
                                    href={profile.html_url}
                                    target="_blank"
                                    class="btn btn-outline-success"
                                >
                                    GitHub profile
                                </a>
                            </div>
                        </div>
                    }
                </div>
                <Spinner
                    isLoading={State.LogModel.isFetchingLogs}
                    component={createDummyTable(State.FilterModel.getFilters('userLog').pageSize, LogColumns)}
                >
                    <div class="jf-top-padding collapse-transition">
                        <Table
                            data={State.UserModel.logs}
                            columns={LogColumns}
                            orderBy={State.FilterModel.getFilters('userLog').orderBy}
                            orderDirection={State.FilterModel.getFilters('userLog').orderDirection}
                            onHeaderClick={(accessor: string) => {
                                State.FilterModel.switchOrderBy('userLog', accessor);
                                this.fetchWithFilters();
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
                                        State.FilterModel.setFilter('userLogs', 'pageSize', event.target.value);
                                        State.FilterModel.setFilter('userLogs', 'pageNumber', 1);
                                        this.fetchWithFilters();
                                    }}
                                    value={State.FilterModel.getFilters('userLogs').pageSize}
                                >
                                    {pageSizes.map((pageSize: number) =>
                                        // tslint:disable-next-line:jsx-key
                                        <option value={pageSize}>{pageSize}</option>
                                    )}
                                </select>
                            </div>
                            <div class="text-muted mt-2 ml-2 pagination-block">
                                <PageCounter
                                    currentPage={State.FilterModel.getFilters('userLogs').pageNumber}
                                    rowsInTable={State.FilterModel.getFilters('userLogs').pageSize}
                                    totalCount={State.LogModel.count}
                                />
                            </div>
                        </div>
                        <div class="col-md-4 m-1 small-center">
                            <Pagination
                                currentPage={State.FilterModel.getFilters('userLogs').pageNumber}
                                numberOfPages={Math.ceil(State.LogModel.count
                                    / State.FilterModel.getFilters('userLogs').pageSize)}
                                onChange={(newPage: number) => {
                                    State.FilterModel.setFilter('userLogs', 'pageNumber', newPage);
                                    this.fetchWithFilters();
                                }}
                            />
                        </div>
                    </div>
                </ContentBlock>
            </Spinner>
        );
    }
}
