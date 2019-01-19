/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ActionTypes, SetLogFilterAction, ResetLogFiltersAction, SetLogFiltersAction } from './types';
import { Filters } from '../../../interfaces/Filter';

// Action creators
export const setLogFilter = (key: string, value: any): SetLogFilterAction => ({
    type: ActionTypes.SET_LOG_FILTER,
    payload: {
        key,
        value
    }
});

export const setLogFilters = (filters: Filters): SetLogFiltersAction => ({
    type: ActionTypes.SET_LOG_FILTERS,
    payload: filters
});

export const resetLogFilters = (): ResetLogFiltersAction => ({
    type: ActionTypes.RESET_LOG_FILTERS
});
