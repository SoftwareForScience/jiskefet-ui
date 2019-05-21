/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { OrderDirection } from '../enums/OrderDirection';

/**
 * Object containing (possibly) multiple filters by key - value pair.
 * Example: { searchterm: 'foo', pageNumber: 1 }
 */
export interface IFilterState {
    [key: string]: FilterValue;
}

/**
 * The possible values a filter can have.
 */
export type FilterValue = string | number | OrderDirection | boolean | null;

/**
 * Identifier used to determine which reducer to execute the action in.
 */
export enum FilterName {
    Log = 'LOG',
    Run = 'RUN',
    Subsystem = 'SUBSYSTEM',
    UserLog = 'USER_LOG'
}
