/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { FilterState } from '../interfaces/Filter';
import * as _ from 'lodash';
import * as m from 'mithril';

/**
 * Set the query parameters in the URL to be equal to the key value pairs in filters.
 * @param filters
 */
export const setQueryParams = (filters: FilterState, isModal: boolean): void | string => {
    const truthyFilters = _.pickBy(filters);
    if (truthyFilters) {
        const queryString: string = m.buildQueryString(truthyFilters);
        if (isModal) {
            return queryString;
        } else {
            m.route.set(`${m.route.get().split(/[?#]/)[0]}?${queryString}`);
        }
    }
};
