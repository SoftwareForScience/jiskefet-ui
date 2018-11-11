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
import _ = require('lodash');
import { Column } from '../interfaces/Column';

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
        placeholder: 'e.g. batch run 32.14_e21'
    }
];

export default class Logs extends MithrilTsxComponent<{}> implements Fetchable<Log> {
    private columns: any[];

    constructor() {
        super();
        this.columns = LogColumns;
    }

    /**
     * Fetch logs with the query param given.
     */
    fetch = (queryParam: string = ''): void => {
        State.LogModel.fetch(queryParam);
    }

    oninit() {
        State.FilterModel.setFiltersToDefaults('log');
        State.FilterModel.setFiltersFromUrl('log');
        this.fetch(State.FilterModel.getQueryString('log'));
    }

    /**
     * Fetch logs with the filters currently in the state (in FilterModel).
     */
    fetchWithFilters = (): void => {
        this.fetch(State.FilterModel.getQueryString('log'));
    }

    createDummyTable = (size: number, columns: Column[]): JSX.Element => {
        const dummyData = [] as Array<{ [column: string]: any }>;
        _.times(size, () => dummyData.push({ key: 'value' }));
        return (
            <Table
                data={dummyData}
                columns={columns}
            />
        );
    }

    view() {
        const pageSizes = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
        return (
            <div className="container-fluid">
                <HttpErrorAlert>
                    <SuccessMessage />
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
                                component={
                                    this.createDummyTable(State.FilterModel.getFilters('log').pageSize, LogColumns)
                                }
                            >
                                <Table
                                    data={State.LogModel.list}
                                    columns={this.columns}
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
                    <div className="row">
                        <div className="col-md-2  offset-3">
                            <select
                                id="pageSize"
                                class="form-control"
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
                        <div className="col-md-7">
                            <Pagination
                                currentPage={State.FilterModel.getFilters('log').pageNumber}
                                numberOfPages={Math.ceil(State.LogModel.count / State.FilterModel.getFilters('log').pageSize)}
                                onChange={(newPage: number) => {
                                    State.FilterModel.setFilter('log', 'pageNumber', newPage);
                                    this.fetchWithFilters();
                                }}
                            />
                        </div>
                    </div>
                </HttpErrorAlert>
            </div>
        );
    }
}
