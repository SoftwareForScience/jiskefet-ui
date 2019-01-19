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
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import { Event } from '../interfaces/Event';
import PageCounter from '../components/PageCounter';
import { createDummyTable } from '../utility/DummyService';
import ContentBlock from '../components/ContentBlock';
import Badges from '../components/Badges';
import { selectCollapsableItem } from '../redux/ducks/ui/selectors';
import { store } from '../redux/configureStore';
import { selectLogFilters, selectLogQueryString } from '../redux/ducks/filter/selectors';
import { switchLogOrderBy, setLogFiltersFromUrl } from '../redux/ducks/filter/operations';
import { setLogFilter } from '../redux/ducks/filter/actions';
import { OrderDirection } from '../enums/OrderDirection';
import { resetLogFilters } from '../redux/ducks/filter/actions';
import { setQueryParams } from '../utility/UrlUtil';

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

export default class Logs extends MithrilTsxComponent<{}> {
    oninit() {
        store.dispatch(setLogFiltersFromUrl());
        this.setQueryAndFetch();
    }

    /**
     * Fetch logs with the filters currently in the state.
     */
    fetchWithFilters = (): void => {
        State.LogModel.fetch(selectLogQueryString(store.getState()));
    }

    /**
     * Set the query parameters in the url and fetch with the filters in the current state.
     */
    setQueryAndFetch = (): void => {
        setQueryParams(selectLogFilters(store.getState()));
        this.fetchWithFilters();
    }

    view() {
        const pageSizes = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
        const collapsableFilterItem = selectCollapsableItem(store.getState(), 'filters');
        return (
            <div>
                <HttpErrorAlert>
                    <SuccessMessage />
                    <div class="row">
                        <div
                            class={
                                collapsableFilterItem && collapsableFilterItem.isCollapsed ?
                                    'col-md-1 collapse-transition' :
                                    'col-md-3 collapse-transition'
                                }
                        >
                            <ContentBlock>
                                <Filter
                                    inputFields={inputFields}
                                    onEvent={(key: string, value: string | number | null) => {
                                        store.dispatch(setLogFilter(key, value));
                                        store.dispatch(setLogFilter('pageNumber', 1));
                                        this.setQueryAndFetch();
                                    }}
                                    filters={selectLogFilters(store.getState())}
                                />
                            </ContentBlock>
                        </div>
                        <div
                            class={
                                collapsableFilterItem && collapsableFilterItem.isCollapsed ?
                                    'col-md-11 mb-5 collapse-transition' :
                                    'col-md-9 mb-5 collapse-transition'
                                }
                        >
                            <Badges
                                filters={selectLogFilters(store.getState())}
                                onEvent={(key: string) => {
                                    store.dispatch(setLogFilter(key, null));
                                    this.setQueryAndFetch();
                                }}
                                onEventAll={() => {
                                    store.dispatch(resetLogFilters());
                                    this.setQueryAndFetch();
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
                                component={createDummyTable(selectLogFilters(store.getState()).pageSize, LogColumns)}
                            >
                                <Table
                                    data={State.LogModel.list}
                                    columns={LogColumns}
                                    orderBy={selectLogFilters(store.getState()).orderBy || undefined}
                                    orderDirection={
                                        selectLogFilters(store.getState()).orderDirection || OrderDirection.Descending
                                    }
                                    onHeaderClick={(accessor: string) => {
                                        store.dispatch(switchLogOrderBy(accessor));
                                        this.setQueryAndFetch();
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
                                                    store.dispatch(setLogFilter('pageSize', event.target.value));
                                                    store.dispatch(setLogFilter('pageNumber', 1));
                                                    this.setQueryAndFetch();
                                                }}
                                                value={selectLogFilters(store.getState()).pageSize}
                                            >
                                                {pageSizes.map((pageSize: number) =>
                                                    // tslint:disable-next-line:jsx-key
                                                    <option value={pageSize}>{pageSize}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div class="text-muted mt-2 ml-2 pagination-block">
                                            <PageCounter
                                                currentPage={selectLogFilters(store.getState()).pageNumber}
                                                rowsInTable={selectLogFilters(store.getState()).pageSize}
                                                totalCount={State.LogModel.count}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-4 m-1 small-center">
                                        <Pagination
                                            currentPage={selectLogFilters(store.getState()).pageNumber}
                                            numberOfPages={Math.ceil(State.LogModel.count
                                                / selectLogFilters(store.getState()).pageSize)}
                                            onChange={(newPage: number) => {
                                                store.dispatch(setLogFilter('pageNumber', newPage));
                                                this.setQueryAndFetch();
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
