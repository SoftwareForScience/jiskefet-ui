/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { RootState } from '../../types';
import { LogFilters } from './types';
import { createSelector } from 'reselect';
import * as m from 'mithril';
import * as _ from 'lodash';

// Selectors

export const selectLogFilters = (state: RootState): LogFilters => state.filter.logFilters;
export const selectLogQueryString = createSelector(
    selectLogFilters,
    (logFilters: LogFilters) => m.buildQueryString(_.pickBy(logFilters))
);
