/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import State from '../models/State';
import SubsystemOverviewColumns from '../constants/SubsystemOverviewColumns';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import HttpErrorAlert from '../atoms/HttpErrorAlert';
import SuccessMessage from '../atoms/SuccessMessage';
import Table from '../molecules/Table';
import ContentBlock from '../molecules/ContentBlock';
import Spinner from '../atoms/Spinner';
import { createDummyTable } from '../utility/DummyService';
import Fetchable from '../interfaces/Fetchable';
import { Event } from '../interfaces/Event';

export default class SubsystemsOverview extends MithrilTsxComponent<{}> implements Fetchable<SubsystemsOverview> {

    oninit() {
        State.FilterModel.setFiltersToDefaults('subsystem');
        State.FilterModel.setFiltersFromUrl('subsystem');
        this.fetch(State.FilterModel.getQueryString('subsystem'));
    }

    /**
     * Fetch logs with the query param given.
     */
    fetch = (queryParam: string = ''): void => {
        State.SubsystemOverviewModel.fetch(queryParam);
    }

    /**
     * Fetch logs with the filters currently in the state (in FilterModel).
     */
    fetchWithFilters = (): void => {
        this.fetch(State.FilterModel.getQueryString('subsystem'));
    }

    view() {
        const timeRanges = [24, 48, 72, 96];
        return (
            <div>
                <HttpErrorAlert>
                    <SuccessMessage />
                    <div class="row">
                        <div class="col-md-9">
                            <ContentBlock class="col-sm-3 mb-2">

                                <label
                                    for="timeRange"
                                    class="col-form-label col-form-label-sm"
                                >
                                    Time range in hours.
                                </label>
                                <select
                                    id="timeRange"
                                    class="form-control form-control-sm"
                                    name="timeRange"
                                    onchange={(event: Event) => {
                                        State.FilterModel
                                            .setFilter('subsystem', 'timeRange', event.target.value);
                                        this.fetchWithFilters();
                                    }}
                                    value={State.FilterModel.getFilters('subsystem').timeRange}
                                >
                                    {timeRanges.map((timeRange: number) =>
                                        <option key={timeRange} value={timeRange}>{timeRange}</option>
                                    )}
                                </select>

                            </ContentBlock>
                            <Spinner
                                isLoading={State.SubsystemOverviewModel.isFetchingSubsystemOverviews}
                                component={
                                    createDummyTable(
                                        State.FilterModel.getFilters('subsystem').pageSize, SubsystemOverviewColumns)
                                }
                            >
                                <Table
                                    data={State.SubsystemOverviewModel.list}
                                    columns={SubsystemOverviewColumns}
                                />
                            </Spinner>
                        </div>
                    </div>
                </HttpErrorAlert>
            </div>
        );
    }
}
