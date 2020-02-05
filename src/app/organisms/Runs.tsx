/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../atoms/Spinner';
import HttpErrorAlert from '../atoms/HttpErrorAlert';
import Table from '../molecules/Table';
import RunColumns from '../constants/RunColumns';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Filter from '../molecules/Filter';
import { createDummyTable } from '../utility/DummyService';
import PageCounter from '../atoms/PageCounter';
import Pagination from '../atoms/Pagination';
import { IEvent } from '../interfaces/Event';
import ContentBlock from '../molecules/ContentBlock';
import SuccessMessage from '../atoms/SuccessMessage';
import Badges from '../atoms/Badges';
import { selectCollapsableItem } from '../redux/ducks/ui/selectors';
import { store } from '../redux/configureStore';
import { setFiltersFromUrl, switchOrderBy } from '../redux/ducks/filter/operations';
import { FilterName } from '../interfaces/Filter';
import { selectQueryString, selectFilters } from '../redux/ducks/filter/selectors';
import { setQueryParams } from '../utility/UrlUtil';
import { setFilter, resetFilters } from '../redux/ducks/filter/actions';
import { OrderDirection } from '../enums/OrderDirection';
import { fetchRuns } from '../redux/ducks/run/operations';
import { selectIsFetchingRuns, selectRuns, selectRunCount } from '../redux/ducks/run/selectors';
import Label from '../atoms/Label';
import Select from '../atoms/Select';
import { PAGE_SIZES } from '../constants/constants';

const inputFields = [
    {
        name: 'runNumber',
        type: 'number',
        event: 'onchange',
        label: 'Run number',
        placeholder: 'e.g. 12'
    },
    {
        name: 'activityId',
        type: 'text',
        event: 'onchange',
        label: 'Activity ID',
        placeholder: 'e.g. xa1yb2zc3'
    },
    {
        name: 'runType',
        type: 'text',
        event: 'onchange',
        label: 'Run type'
    },
    {
        name: 'runQuality',
        type: 'text',
        event: 'onchange',
        label: 'Run quality'
    },
    {
        name: 'startTimeO2Start',
        type: 'datetime-local',
        event: 'onblur',
        label: 'Start range - Time O\xB2 Start'
    },
    {
        name: 'endTimeO2Start',
        type: 'datetime-local',
        event: 'onblur',
        label: 'End range - Time O\xB2 Start'
    },
    {
        name: 'startTimeO2End',
        type: 'datetime-local',
        event: 'onblur',
        label: 'Start range - Time O\xB2 End'
    },
    {
        name: 'endTimeO2End',
        type: 'datetime-local',
        event: 'onblur',
        label: 'End range - Time O\xB2 End'
    },
    {
        name: 'startTimeTrgStart',
        type: 'datetime-local',
        event: 'onblur',
        label: 'Start range - Time TRG Start'
    },
    {
        name: 'endTimeTrgStart',
        type: 'datetime-local',
        event: 'onblur',
        label: 'End range - Time TRG Start'
    },
    {
        name: 'startTimeTrgEnd',
        type: 'datetime-local',
        event: 'onblur',
        label: 'Start range - Time TRG End'
    },
    {
        name: 'endTimeTrgEnd',
        type: 'datetime-local',
        event: 'onblur',
        label: 'End range - Time TRG End'
    },
];

export default class Runs extends MithrilTsxComponent<{}> {
    oninit() {
        store.dispatch(setFiltersFromUrl(FilterName.Run));
        this.setQueryAndFetch();
    }

    /**
     * Fetch runs with the filters currently in the state.
     */
    fetchWithFilters = (): void => {
        const queryString = selectQueryString(store.getState())(FilterName.Run);
        store.dispatch(fetchRuns(queryString));
    }

    /**
     * Set the query parameters in the url and fetch with the filters in the current state.
     */
    setQueryAndFetch = (): void => {
        const runFilters = selectFilters(store.getState())[FilterName.Run];
        setQueryParams(runFilters);
        this.fetchWithFilters();
    }

    view() {
        const collapsableFilterItem = selectCollapsableItem(store.getState(), 'filters');
        const runFilters = selectFilters(store.getState())[FilterName.Run];
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
                                        store.dispatch(setFilter(FilterName.Run, key, value));
                                        store.dispatch(setFilter(FilterName.Run, 'pageNumber', 1));
                                        this.setQueryAndFetch();
                                    }}
                                    filters={runFilters}
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
                            <div class="mb-2">
                                <Badges
                                    filters={runFilters}
                                    onEvent={(key: string) => {
                                        store.dispatch(setFilter(FilterName.Run, key, null));
                                        this.setQueryAndFetch();
                                    }}
                                    onEventAll={() => {
                                        store.dispatch(resetFilters(FilterName.Run));
                                        this.setQueryAndFetch();
                                    }}
                                    ignoredFilters={[
                                        'orderBy',
                                        'orderDirection',
                                        'pageSize',
                                        'pageNumber'
                                    ]}
                                />
                            </div>
                            <Spinner
                                isLoading={selectIsFetchingRuns(store.getState())}
                                component={
                                    createDummyTable(
                                        runFilters.pageSize,
                                        RunColumns,
                                        'jf-font-sm'
                                    )
                                }
                            >
                                <Table
                                    data={selectRuns(store.getState())}
                                    columns={RunColumns}
                                    className={'jf-font-sm'}
                                    orderBy={runFilters.orderBy || undefined}
                                    orderDirection={runFilters.orderDirection || OrderDirection.Descending}
                                    onHeaderClick={(accessor: string) => {
                                        store.dispatch(switchOrderBy(FilterName.Run, accessor));
                                        this.setQueryAndFetch();
                                    }}
                                />
                            </Spinner>
                            <ContentBlock padding={1} >
                                <div class="row">
                                    <div class="col-md-4 m-1 small-center">
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
                                                        setFilter(FilterName.Run, 'pageSize', event.target.value)
                                                    );
                                                    store.dispatch(setFilter(FilterName.Run, 'pageNumber', 1));
                                                    this.setQueryAndFetch();
                                                }}
                                                defaultOption={runFilters.pageSize}
                                                options={PAGE_SIZES}
                                            />
                                        </div>
                                        <div class="text-muted mt-2 ml-2 pagination-block">
                                            <PageCounter
                                                currentPage={runFilters.pageNumber}
                                                rowsInTable={runFilters.pageSize}
                                                totalCount={selectRunCount(store.getState())}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-4 m-1 small-center">
                                        <Pagination
                                            currentPage={runFilters.pageNumber}
                                            numberOfPages={Math.ceil(selectRunCount(store.getState())
                                                / runFilters.pageSize)}
                                            onChange={(newPage: number) => {
                                                store.dispatch(setFilter(FilterName.Run, 'pageNumber', newPage));
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
