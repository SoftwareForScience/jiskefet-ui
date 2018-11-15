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
import NewFilter from '../components/NewFilter';
import Pagination from '../components/Pagination';
import { Event } from '../interfaces/Event';
import PageCounter from '../components/PageCounter';
import { createDummyTable } from '../utility/DummyService';

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
                    <div class="row bg-light rounded mx-2 shadow-sm border">
                        <div class="col-md-12 py-2">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="text-muted">
                                        <PageCounter
                                            currentPage={State.FilterModel.getFilters('log').pageNumber}
                                            rowsInTable={State.FilterModel.getFilters('log').pageSize}
                                            totalCount={State.LogModel.count}
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <select
                                        id="pageSize"
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
                            </div>
                        </div>
                        <div class="col-md-12 py-2">
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
                    <div className="row">
                        <div className="col-md-3 mt-2">
                            <NewFilter
                                inputFields={inputFields}
                                onEvent={(key: string, value: string | number | null) => {
                                    State.FilterModel.setFilter('log', key, value);
                                    State.FilterModel.setFilter('log', 'pageNumber', 1);
                                    this.fetch(State.FilterModel.getQueryString('log'));
                                }}
                                filters={State.FilterModel.getFilters('log')}
                            />
                        </div>
                        <div className="col-md-9 mt-2">
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
                        </div>
                    </div>
                </HttpErrorAlert>
            </div>
        );
    }
}
