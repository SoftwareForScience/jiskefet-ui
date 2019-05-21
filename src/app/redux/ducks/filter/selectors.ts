/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState } from '../../types';
import { RootFilterState } from './types';
import { createSelector } from 'reselect';
import * as m from 'mithril';
import * as _ from 'lodash';
import { IFilterState, FilterName } from '../../../interfaces/Filter';

// Selectors
export const selectFilters = (state: RootState): RootFilterState => state.filter;

/**
 * Returns a function that returns a query string (for in the URL) based on the filterName given.
 * Can be called as follows: selectQueryString(store.getState())(FilterName.Log);
 */
export const selectQueryString = createSelector(
    selectFilters,
    (filters: RootFilterState) => _.memoize(
        (filterName: FilterName): string => {
            const childFilters: IFilterState = filters[filterName];
            return m.buildQueryString(_.pickBy(childFilters));
        }
    )
);
