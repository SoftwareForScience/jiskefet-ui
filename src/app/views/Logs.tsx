/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../components/Spinner';
import Table from '../components/Table';
import SuccessMessage from '../components/SuccessMessage';
import HttpErrorAlert from '../components/HttpErrorAlert';
import State from '../models/State';
import LogColumns from '../constants/LogColumns';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Fetchable from '../interfaces/Fetchable';
import { Log } from '../interfaces/Log';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import { Event } from '../interfaces/Event';
import PageCounter from '../components/PageCounter';
import { createDummyTable } from '../utility/DummyService';
import ContentBlock from '../components/ContentBlock';
import Badges from '../components/Badges';

const inputFields = [
    {
        name: 'logId',
        type: 'number',
        label: 'Log id',
        event: 'onchange',
        placeholder: 'e.g. 1'
    },
    {
        name: 'searchterm',
        type: 'text',
        label: 'Title',
        event: 'onchange',
        placeholder: 'e.g. EOR report'
    },
    {
        name: 'startCreationTime',
        type: 'datetime-local',
        event: 'onblur'
    },
    {
        name: 'endCreationTime',
        type: 'datetime-local',
        event: 'onblur'
    },
];

export default class Logs extends MithrilTsxComponent<{}> implements Fetchable<Log> {
    oninit() {
        State.FilterModel.setFiltersToDefaults('log');
        State.FilterModel.setFiltersFromUrl('log');
        this.fetch(State.FilterModel.getQueryString('log'));
    }
    /**
     * Fetch logs with the query param given.
     */
    fetch = (queryParam: string = ''): void => {
        State.LogModel.fetch(queryParam);
    }

    /**
     * Fetch logs with the filters currently in the state (in FilterModel).
     */
    fetchWithFilters = (): void => {
        this.fetch(State.FilterModel.getQueryString('log'));
    }

    view() {
        const pageSizes = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
        return (
            <div>
                <HttpErrorAlert>
                    <SuccessMessage />
                    <div class="row">
                        <div
                            class={
                                // tslint:disable-next-line:no-string-literal
                                State.AppState.showFilter['filters'] ?
                                    'col-md-3 collapse-transition' :
                                    'col-md-1 collapse-transition'
                                }
                        >
                            <ContentBlock>
                                <Filter
                                    inputFields={inputFields}
                                    onEvent={(key: string, value: string | number | null) => {
                                        State.FilterModel.setFilter('log', key, value);
                                        State.FilterModel.setFilter('log', 'pageNumber', 1);
                                        this.fetch(State.FilterModel.getQueryString('log'));
                                    }}
                                    filters={State.FilterModel.getFilters('log')}
                                />
                            </ContentBlock>
                        </div>
                        <div
                            class={
                                // tslint:disable-next-line:no-string-literal
                                State.AppState.showFilter['filters'] ?
                                    'col-md-9 mb-5 collapse-transition' :
                                    'col-md-11 mb-5 collapse-transition'
                                }
                        >
                            <Badges
                                filters={State.FilterModel.getFilters('log')}
                                onEvent={(key: string) => {
                                    State.FilterModel.setFilter('log', key, null);
                                    this.fetchWithFilters();
                                }}
                                onEventAll={() => {
                                    State.FilterModel.setFiltersToDefaults('log');
                                    this.fetchWithFilters();
                                }}
                                ignoredFilters={[
                                    'orderBy',
                                    'orderDirection',
                                    'pageSize',
                                    'pageNumber'
                                ]}
                            />
                            <Spinner
                                isLoading={State.LogModel.isFetchingLogs}
                                component={createDummyTable(State.FilterModel.getFilters('log').pageSize, LogColumns)}
                            >
                                <Table
                                    data={State.LogModel.list}
                                    columns={LogColumns}
                                    orderBy={State.FilterModel.getFilters('log').orderBy}
                                    orderDirection={State.FilterModel.getFilters('log').orderDirection}
                                    onHeaderClick={(accessor: string) => {
                                        State.FilterModel.switchOrderBy('log', accessor);
                                        this.fetchWithFilters();
                                    }}
                                />
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
                                                    State.FilterModel.setFilter('log', 'pageSize', event.target.value);
                                                    State.FilterModel.setFilter('log', 'pageNumber', 1);
                                                    this.fetchWithFilters();
                                                }}
                                                value={State.FilterModel.getFilters('log').pageSize}
                                            >
                                                {pageSizes.map((pageSize: number) =>
                                                    // tslint:disable-next-line:jsx-key
                                                    <option value={pageSize}>{pageSize}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div class="text-muted mt-2 ml-2 pagination-block">
                                            <PageCounter
                                                currentPage={State.FilterModel.getFilters('log').pageNumber}
                                                rowsInTable={State.FilterModel.getFilters('log').pageSize}
                                                totalCount={State.LogModel.count}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-4 m-1 small-center">
                                        <Pagination
                                            currentPage={State.FilterModel.getFilters('log').pageNumber}
                                            numberOfPages={Math.ceil(State.LogModel.count
                                                / State.FilterModel.getFilters('log').pageSize)}
                                            onChange={(newPage: number) => {
                                                State.FilterModel.setFilter('log', 'pageNumber', newPage);
                                                this.fetchWithFilters();
                                            }}
                                        />
                                    </div>
                                </div>
                            </ContentBlock>
                        </div>
                    </div>
                </HttpErrorAlert>
            </div >
        );
    }
}
