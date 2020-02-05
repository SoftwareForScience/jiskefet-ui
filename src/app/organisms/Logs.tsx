/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../atoms/Spinner';
import Table from '../molecules/Table';
import SuccessMessage from '../atoms/SuccessMessage';
import HttpErrorAlert from '../atoms/HttpErrorAlert';
import LogColumns from '../constants/LogColumns';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Filter from '../molecules/Filter';
import Pagination from '../atoms/Pagination';
import { IEvent } from '../interfaces/Event';
import PageCounter from '../atoms/PageCounter';
import { createDummyTable } from '../utility/DummyService';
import ContentBlock from '../molecules/ContentBlock';
import Badges from '../atoms/Badges';
import { selectCollapsableItem } from '../redux/ducks/ui/selectors';
import { store } from '../redux/configureStore';
import { OrderDirection } from '../enums/OrderDirection';
import { setQueryParams } from '../utility/UrlUtil';
import { FilterName } from '../interfaces/Filter';
import { setFiltersFromUrl, switchOrderBy } from '../redux/ducks/filter/operations';
import { selectQueryString, selectFilters } from '../redux/ducks/filter/selectors';
import { setFilter, resetFilters } from '../redux/ducks/filter/actions';
import { fetchLogs } from '../redux/ducks/log/operations';
import { selectIsFetchingLogs, selectLogCount, selectLogs } from '../redux/ducks/log/selectors';
import Label from '../atoms/Label';
import Select from '../atoms/Select';
import Button, { ButtonClass } from '../atoms/Button';
import { PAGE_SIZES } from '../constants/constants';

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
        store.dispatch(setFiltersFromUrl(FilterName.Log));
        this.setQueryAndFetch();
    }

    /**
     * Fetch logs with the filters currently in the state.
     */
    fetchWithFilters = (): void => {
        const queryString = selectQueryString(store.getState())(FilterName.Log);
        store.dispatch(fetchLogs(queryString));
    }

    /**
     * Set the query parameters in the url and fetch with the filters in the current state.
     */
    setQueryAndFetch = (): void => {
        const logFilters = selectFilters(store.getState())[FilterName.Log];
        setQueryParams(logFilters);
        this.fetchWithFilters();
    }

    view() {
        const collapsableFilterItem = selectCollapsableItem(store.getState(), 'filters');
        const logFilters = selectFilters(store.getState())[FilterName.Log];
        return (
            <div>
                <SuccessMessage />
                <HttpErrorAlert>
                    <div class="row">
                        <div class="col" style={{ marginBottom: '0.5rem' }}>
                            <Button
                                margin="float-right"
                                buttonClass={ButtonClass.DEFAULT}
                                onClick={() => m.route.set(
                                '/logs/create'
                                )}
                                text="Create new log"
                            />
                    </div>
                    </div>
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
                                        store.dispatch(setFilter(FilterName.Log, key, value));
                                        store.dispatch(setFilter(FilterName.Log, 'pageNumber', 1));
                                        this.setQueryAndFetch();
                                    }}
                                    filters={logFilters}
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
                                filters={logFilters}
                                onEvent={(key: string) => {
                                    store.dispatch(setFilter(FilterName.Log, key, null));
                                    this.setQueryAndFetch();
                                }}
                                onEventAll={() => {
                                    store.dispatch(resetFilters(FilterName.Log));
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
                                isLoading={selectIsFetchingLogs(store.getState())}
                                component={createDummyTable(logFilters.pageSize, LogColumns)}
                            >
                                <Table
                                    data={selectLogs(store.getState())}
                                    columns={LogColumns}
                                    orderBy={logFilters.orderBy || undefined}
                                    orderDirection={logFilters.orderDirection || OrderDirection.Descending}
                                    onHeaderClick={(accessor: string) => {
                                        store.dispatch(switchOrderBy(FilterName.Log, accessor));
                                        this.setQueryAndFetch();
                                    }}
                                />
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
                                                        setFilter(FilterName.Log, 'pageSize', event.target.value)
                                                    );
                                                    store.dispatch(setFilter(FilterName.Log, 'pageNumber', 1));
                                                    this.setQueryAndFetch();
                                                }}
                                                defaultOption={logFilters.pageSize}
                                                options={PAGE_SIZES}
                                            />
                                        </div>
                                        <div class="text-muted mt-2 ml-2 pagination-block">
                                            <PageCounter
                                                currentPage={logFilters.pageNumber}
                                                rowsInTable={logFilters.pageSize}
                                                totalCount={selectLogCount(store.getState())}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-4 m-1 small-center">
                                        <Pagination
                                            currentPage={logFilters.pageNumber}
                                            numberOfPages={Math.ceil(selectLogCount(store.getState())
                                                / logFilters.pageSize)}
                                            onChange={(newPage: number) => {
                                                store.dispatch(setFilter(FilterName.Log, 'pageNumber', newPage));
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
