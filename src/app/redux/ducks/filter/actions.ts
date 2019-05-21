/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { ActionTypes, SetFilterAction, ResetFiltersAction, SetFiltersAction } from './types';
import { IFilterState, FilterName } from '../../../interfaces/Filter';

// Action creators

/**
 * Set the filter for the name given.
 *
 * @param name The name of the filter reducer.
 * @param key The key to set.
 * @param value The value for the key.
 */
export const setFilter = (name: FilterName, key: string, value: any): SetFilterAction => ({
    type: ActionTypes.SET_FILTER,
    name,
    payload: {
        key,
        value
    }
});

/**
 * Replaces the current filter state for the name given to the filters given as an argument.
 * When the current filter state has properties that are missing in the filters argument given, these
 * properties are kept the same.
 *
 * @param name The name of the filter reducer.
 * @param filters The filters used to replace the filter values.
 */
export const setFilters = (name: FilterName, filters: IFilterState): SetFiltersAction => ({
    type: ActionTypes.SET_FILTERS,
    name,
    payload: filters
});

/**
 * Resets the filters for the name given to their initial values.
 *
 * @param name The name of the filter reducer.
 */
export const resetFilters = (name: FilterName): ResetFiltersAction => ({
    type: ActionTypes.RESET_FILTERS,
    name
});
