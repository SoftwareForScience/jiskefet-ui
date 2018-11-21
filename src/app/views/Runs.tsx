/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import Spinner from '../components/Spinner';
import HttpErrorAlert from '../components/HttpErrorAlert';
import Table from '../components/Table';
import State from '../models/State';
import RunColumns from '../constants/RunColumns';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Fetchable from '../interfaces/Fetchable';
import { Run } from '../interfaces/Run';
import Filter from '../components/Filter';
import { createDummyTable } from '../utility/DummyService';
import PageCounter from '../components/PageCounter';
import Pagination from '../components/Pagination';
import { Event } from '../interfaces/Event';
import ContentBlock from '../components/ContentBlock';
import SuccessMessage from '../components/SuccessMessage';
import Badges from '../components/Badges';

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
        label: 'Start range - Time O2 Start'
    },
    {
        name: 'endTimeO2Start',
        type: 'datetime-local',
        event: 'onblur',
        label: 'End range - Time O2 Start'
    },
    {
        name: 'startTimeO2End',
        type: 'datetime-local',
        event: 'onblur',
        label: 'Start range - Time O2 End'
    },
    {
        name: 'endTimeO2End',
        type: 'datetime-local',
        event: 'onblur',
        label: 'End range - Time O2 End'
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

export default class Runs extends MithrilTsxComponent<{}> implements Fetchable<Run> {
    oninit() {
        State.FilterModel.setFiltersToDefaults('run');
        State.FilterModel.setFiltersFromUrl('run');
        this.fetch(State.FilterModel.getQueryString('run'));
    }

    /**
     * Fetch runs with the query param given.
     */
    fetch = (queryParam?: string) => {
        State.RunModel.fetch(queryParam);
    }

    /**
     * Fetch runs with the filters currently in the state (in FilterModel).
     */
    fetchWithFilters = (): void => {
        this.fetch(State.FilterModel.getQueryString('run'));
    }

    view() {
        const pageSizes = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
        return (
            <div>
                <HttpErrorAlert>
                    <SuccessMessage />
                    <div class="row">
                        <div class="col-md-3">
                            <ContentBlock class="mb-2">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label
                                            for="pageSize"
                                            class="col-form-label col-form-label-sm"
                                        >
                                            Page size
                                        </label>
                                        <select
                                            id="pageSize"
                                            class="form-control form-control-sm"
                                            name="pageSize"
                                            onchange={(event: Event) => {
                                                State.FilterModel.setFilter('run', 'pageSize', event.target.value);
                                                State.FilterModel.setFilter('run', 'pageNumber', 1);
                                                this.fetchWithFilters();
                                            }}
                                            value={State.FilterModel.getFilters('run').pageSize}
                                        >
                                            {pageSizes.map((pageSize: number) =>
                                                // tslint:disable-next-line:jsx-key
                                                <option value={pageSize}>{pageSize}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="text-muted mt-2">
                                            <PageCounter
                                                currentPage={State.FilterModel.getFilters('run').pageNumber}
                                                rowsInTable={State.FilterModel.getFilters('run').pageSize}
                                                totalCount={State.RunModel.count}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </ContentBlock>
                            <ContentBlock>
                                <Filter
                                    inputFields={inputFields}
                                    onEvent={(key: string, value: string | number | null) => {
                                        State.FilterModel.setFilter('run', key, value);
                                        State.FilterModel.setFilter('run', 'pageNumber', 1);
                                        this.fetch(State.FilterModel.getQueryString('run'));
                                    }}
                                    filters={State.FilterModel.getFilters('run')}
                                />
                            </ContentBlock>
                        </div>
                        <div class="col-md-9">
                            <div class="mb-2">
                                <Badges
                                    filters={State.FilterModel.getFilters('run')}
                                    onEvent={(key: string) => {
                                        State.FilterModel.setFilter('run', key, null);
                                        this.fetchWithFilters();
                                    }}
                                    onEventAll={() => {
                                        State.FilterModel.setFiltersToDefaults('run');
                                        this.fetchWithFilters();
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
                                isLoading={State.RunModel.isFetchingRuns}
                                component={
                                    createDummyTable(
                                        State.FilterModel.getFilters('run').pageSize,
                                        RunColumns,
                                        'jf-font-sm'
                                    )
                                }
                            >
                                <Table
                                    data={State.RunModel.list}
                                    columns={RunColumns}
                                    className={'jf-font-sm'}
                                    orderBy={State.FilterModel.getFilters('run').orderBy}
                                    orderDirection={State.FilterModel.getFilters('run').orderDirection}
                                    onHeaderClick={(accessor: string) => {
                                        State.FilterModel.switchOrderBy('run', accessor);
                                        this.fetchWithFilters();
                                    }}
                                />
                            </Spinner>
                            <ContentBlock padding={1} >
                                <Pagination
                                    currentPage={State.FilterModel.getFilters('run').pageNumber}
                                    numberOfPages={Math.ceil(State.RunModel.count
                                        / State.FilterModel.getFilters('run').pageSize)}
                                    onChange={(newPage: number) => {
                                        State.FilterModel.setFilter('run', 'pageNumber', newPage);
                                        this.fetchWithFilters();
                                    }}
                                />
                            </ContentBlock>
                        </div>
                    </div>
                </HttpErrorAlert>
            </div>
        );
    }
}
