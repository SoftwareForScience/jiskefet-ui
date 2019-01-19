/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { OrderDirection } from '../enums/OrderDirection';

/**
 * Object containing (possibly) multiple keys that contain Filters that relate to the same
 * entity, e.g. filters that relate to the Log entity could go under the key 'logFilters'.
 * Example: { logFilters: { searchterm: 'foo', pageNumber: 1 } }
 */
export interface IFilterState {
    [key: string]: Filters;
}

/**
 * Object containing (possibly) multiple filters by key - value pair.
 * Example: { searchterm: 'foo', pageNumber: 1 }
 */
export interface Filters {
    [key: string]: FilterValue;
}

/**
 * The possible values a filter can have.
 */
export type FilterValue = string | number | OrderDirection | boolean | null;
