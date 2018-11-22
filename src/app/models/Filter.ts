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
const DefaultFilters = {
    log: {
        logId: null as string | null,
        searchterm: null as string | null,
        creationTime: null as string | null,
        origin: null as string | null,
        subType: null as string | null,
        orderBy: 'creationTime' as string | null,
        orderDirection: 'DESC' as OrderDirection | null,
        pageSize: 16 as number,
        pageNumber: 1 as number | null
    },
    run: {
        runNumber: null as string | null,
        activityId: null as string | null,
        runType: null as string | null,
        runQuality: null as string | null,
        startTimeO2Start: null as string | null,
        endTimeO2Start: null as string | null,
        startTimeO2End: null as string | null,
        endTimeO2End: null as string | null,
        startTimeTrgStart: null as string | null,
        endTimeTrgStart: null as string | null,
        startTimeTrgEnd: null as string | null,
        endTimeTrgEnd: null as string | null,
        orderBy: null as string | null,
        orderDirection: null as OrderDirection | null,
        pageSize: 16 as number,
        pageNumber: 1 as number | null
    }
};

const Filters = {
    log: {
        logId: null as string | null,
        searchterm: null as string | null,
        creationTime: null as string | null,
        origin: null as string | null,
        subType: null as string | null,
        orderBy: null as string | null,
        orderDirection: null as OrderDirection | null,
        pageSize: 16 as number,
        pageNumber: 1 as number | null
    },
    run: {
        runId: null as string | null,
        activityId: null as string | null,
        runType: null as string | null,
        runQuality: null as string | null,
        startTimeO2Start: null as string | null,
        endTimeO2Start: null as string | null,
        startTimeO2End: null as string | null,
        endTimeO2End: null as string | null,
        startTimeTrgStart: null as string | null,
        endTimeTrgStart: null as string | null,
        startTimeTrgEnd: null as string | null,
        endTimeTrgEnd: null as string | null,
        orderBy: null as string | null,
        orderDirection: null as OrderDirection | null,
        pageSize: 16 as number,
        pageNumber: 1 as number | null
    }
};

// Todo: Move this to util class
/**
 * Update the url with query params in filters.
 * @param filters The filters object to be inserted into the url as query params.
 */
const updateUrlFromFilters = (filterKey: string): void => {
    const cleanFilters = getCleanFilters(filterKey);
    if (cleanFilters) {
        const queryString: string = m.buildQueryString(cleanFilters);
        m.route.set(`${m.route.get().split(/[?#]/)[0]}?${queryString}`);
    }
};

/**
 * Returns the filters that are not null.
 * @param filterKey e.g. 'log' or 'run'
 */
const getCleanFilters = (filterKey: string): { [key: string]: string } => {
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
    setFilter: (filterKey: string, key: string, value: string | number | null): void => {
        Filters[filterKey][key] = value || null;
        updateUrlFromFilters(filterKey);
    },
    /**
     * Sets the query params from the url into the filters.
     */
    setFiltersFromUrl: (filterKey: string) => {
        const filtersFromUrl = m.route.param();
        _.merge(Filters[filterKey], filtersFromUrl);
    },
    /**
     * Returns the filter object on key filterKey
     */
    getFilters: (filterKey: string) => {
        return Filters[filterKey];
    },
    /**
     * Sets all the values for the object at filterKey to null;
     */
    setFiltersToDefaults: (filterKey: string) => {
        Object.assign(Filters[filterKey], DefaultFilters[filterKey]);
        updateUrlFromFilters(filterKey);
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
        updateUrlFromFilters(filterKey);
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
