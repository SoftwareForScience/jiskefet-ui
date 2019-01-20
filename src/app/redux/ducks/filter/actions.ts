/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ActionTypes, SetFilterAction, ResetFiltersAction, SetFiltersAction, FilterName } from './types';
import { FilterState } from '../../../interfaces/Filter';

// Action creators
export const setFilter = (name: FilterName, key: string, value: any): SetFilterAction => ({
    type: ActionTypes.SET_FILTER,
    name,
    payload: {
        key,
        value
    }
});

export const setFilters = (name: FilterName, filters: FilterState): SetFiltersAction => ({
    type: ActionTypes.SET_FILTERS,
    name,
    payload: filters
});

export const resetFilters = (name: FilterName): ResetFiltersAction => ({
    type: ActionTypes.RESET_FILTERS,
    name
});
