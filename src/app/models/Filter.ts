import * as m from 'mithril';
import { OrderDirection } from '../enums/OrderDirection';
import * as _ from 'lodash';

/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

 // Todo: think about moving this object, so that this class can accept a generic object
const Filters = {
    log: {
        logId: null as string | null,
        searchterm: null as string | null,
        creationTime: null as string | null,
        origin: null as string | null,
        subType: null as string | null,
        orderBy: null as string | null,
        orderDirection: null as OrderDirection | null,
        pageSize: null as string | null,
        pageNumber: null as string | null
    },
};

// Todo: Move this to util class
/**
 * Update the route with query params in filters.
 * @param filters The filters object to be inserted into the route as query params.
 */
const updateRoute = (filters: any): void => {
    const queryString: string = m.buildQueryString(filters);
    console.log(filters);
    m.route.set(`${getPathFromUrl(m.route.get())}?${queryString}`);
};

// Todo: Move this to util class
const getPathFromUrl = (url: string): string => {
    return url.split(/[?#]/)[0];
};

const getCleanFilters = (filterKey: string) => {
    return _.pickBy(Filters[filterKey], _.identity);
};

/**
 * Stores the filters that are used as query parameters for api calls.
 * e.g. GET api/logs?searchterm=test&origin=human
 */
const FilterModel = {
    /**
     * Set a filter, i.e. filterKey.key = value.
     */
    setFilter: (filterKey: string, key: string, value: string | null): void => {
        Filters[filterKey][key] = value || null;
        updateRoute(getCleanFilters(filterKey));
    },
    /**
     * Returns the filter object on key filterKey
     */
    getFilters: (filterKey: string) => {
        return Filters[filterKey];
    },
    /**
     * Switches the orderDirection for the columnName given.
     */
    switchOrderBy: (filterKey: string, columnName: string): void => {
        if (Filters[filterKey].orderBy !== columnName) {
            Filters[filterKey].orderDirection = null;
        }
        Filters[filterKey].orderBy = columnName;
        switch (Filters[filterKey].orderDirection) {
            case null:
                Filters[filterKey].orderDirection = OrderDirection.Ascending;
                break;
            case OrderDirection.Ascending:
                Filters[filterKey].orderDirection = OrderDirection.Descending;
                break;
            case OrderDirection.Descending:
                Filters[filterKey].orderBy = null;
                Filters[filterKey].orderDirection = null;
                break;
            default:
        }
        updateRoute(getCleanFilters(filterKey));
    },
    // delete this, just for testing purposes
    getAll: () => {
        return Filters;
    },
    /**
     * Returns the filters as a query string.
     */
    getQueryString: (filterKey: string): string => {
        return m.buildQueryString(getCleanFilters(filterKey));
    }
};

type FilterModel = typeof FilterModel;
export default FilterModel;
