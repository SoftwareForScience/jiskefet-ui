import { OrderDirection } from '../enums/OrderDirection';

/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

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

/**
 * Stores the filters that are used as query parameters for api calls.
 * e.g. GET api/logs?searchterm=test&origin=human
 */
const FilterModel = {
    /**
     * Set a filter, i.e. identifier.key = value.
     */
    setFilter: (filterKey: string, key: string, value: any): void => {
        Filters[filterKey][key] = value;
    },
    /**
     * Returns the filter object on key filterKey
     */
    get: (filterKey: string) => {
        return Filters[filterKey];
    },
    /**
     * Change the orderDirection for the columnName (orderBy) given.
     */
    changeOrderBy: (filterKey: string, columnName: string): void => {
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
    },
    // delete this, just for testing purposes
    getAll: () => {
        return Filters;
    }
};

type FilterModel = typeof FilterModel;
export default FilterModel;
