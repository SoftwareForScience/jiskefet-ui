/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ThunkResult, FilterAction, FilterName } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../types';
import { setFilter, setFilters } from './actions';
import { selectLogFilters } from './selectors';
import * as _ from 'lodash';
import * as m from 'mithril';
import { cycleOrderDirection } from '../../../utility/OrderDirectionUtil';

// Thunks

/**
 * Switches the orderDirection field to a different OrderDirection enum in a standard order, for the orderBy given
 * as the 'columnName' argument.
 * @param columnName e.g. title, creation_date.
 */
export const switchOrderBy = (name: FilterName, columnName: string): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, FilterAction>, getState: () => RootState): Promise<void> => {
        if (selectLogFilters(getState()).orderBy !== columnName) {
            dispatch(setFilter(name, 'orderDirection', null));
        }
        const direction = cycleOrderDirection(selectLogFilters(getState()).orderDirection);
        dispatch(setFilter(name, 'orderDirection', direction));
        if (direction === null) {
            dispatch(setFilter(name, 'orderBy', null));
        } else {
            dispatch(setFilter(name, 'orderBy', columnName));
        }
    };

/**
 * Set the log filters based on the query parameters in the url.
 */
export const setLogFiltersFromUrl = (name: FilterName): ThunkResult<Promise<void>> =>
    async (dispatch: ThunkDispatch<RootState, void, FilterAction>): Promise<void> => {
        const filtersFromUrl = m.route.param();
        dispatch(setFilters(name, filtersFromUrl));
    };
