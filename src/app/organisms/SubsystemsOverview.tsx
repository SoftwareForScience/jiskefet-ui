/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import SubsystemOverviewColumns from '../constants/SubsystemOverviewColumns';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import HttpErrorAlert from '../atoms/HttpErrorAlert';
import SuccessMessage from '../atoms/SuccessMessage';
import Table from '../molecules/Table';
import ContentBlock from '../molecules/ContentBlock';
import Spinner from '../atoms/Spinner';
import { IEvent } from '../interfaces/Event';
import { fetchSubsystemOverviews } from '../redux/ducks/subsystem/operations';
import { store } from '../redux/configureStore';
import { selectFetchingSubsystemOverviews, selectSubsystemOverviews } from '../redux/ducks/subsystem/selectors';
import { setFiltersFromUrl, switchOrderBy } from '../redux/ducks/filter/operations';
import { FilterName } from '../interfaces/Filter';
import { selectQueryString, selectFilters } from '../redux/ducks/filter/selectors';
import { setQueryParams } from '../utility/UrlUtil';
import { setFilter } from '../redux/ducks/filter/actions';
import { OrderDirection } from '../enums/OrderDirection';
import Label from '../atoms/Label';
import Select from '../atoms/Select';

export default class SubsystemsOverview extends MithrilTsxComponent<{}> {

    oninit() {
        store.dispatch(setFiltersFromUrl(FilterName.Subsystem));
        this.setQueryAndFetch();
    }

    /**
     * Fetch subsystems with the filters currently in the state.
     */
    fetchWithFilters = (): void => {
        const queryString = selectQueryString(store.getState())(FilterName.Subsystem);
        store.dispatch(fetchSubsystemOverviews(queryString));
    }

    /**
     * Set the query parameters in the url and fetch with the filters in the current state.
     */
    setQueryAndFetch = (): void => {
        const subsystemFilters = selectFilters(store.getState())[FilterName.Subsystem];
        setQueryParams(subsystemFilters);
        this.fetchWithFilters();
    }

    view() {
        const timeRanges = [24, 48, 72, 96];
        const subsystemFilters = selectFilters(store.getState())[FilterName.Subsystem];
        return (
            <div>
                <HttpErrorAlert>
                    <SuccessMessage />
                    <div class="row">
                        <div class="col-md-9">
                            <ContentBlock class="col-sm-3 mb-2">
                                <Label
                                    id="timeRange"
                                    className="col-form-label col-form-label-sm"
                                    text="Time range in hours"
                                />
                                <Select
                                    id="timeRange"
                                    className="form-control form-control-sm"
                                    name="timeRange"
                                    oninput={(event: IEvent) => {
                                        store.dispatch(setFilter(
                                            FilterName.Subsystem,
                                            'timeRange',
                                            event.target.value
                                        ));
                                        this.setQueryAndFetch();
                                    }}
                                    defaultOption={subsystemFilters.timeRange}
                                    options={timeRanges}
                                />
                            </ContentBlock>
                            <Spinner
                                isLoading={selectFetchingSubsystemOverviews(store.getState())}
                            >
                                <Table
                                    data={selectSubsystemOverviews(store.getState())}
                                    columns={SubsystemOverviewColumns}
                                    orderBy={subsystemFilters.orderBy || undefined}
                                    orderDirection={subsystemFilters.orderDirection || OrderDirection.Descending}
                                    onHeaderClick={(accessor: string) => {
                                        store.dispatch(switchOrderBy(FilterName.Subsystem, accessor));
                                        this.setQueryAndFetch();
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
