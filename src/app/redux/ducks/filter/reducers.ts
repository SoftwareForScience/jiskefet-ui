/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer } from 'redux';
import { FilterState, FilterAction, ActionTypes } from './types';
import { OrderDirection } from '../../../enums/OrderDirection';
import * as _ from 'lodash';

// Initial state
const initialState: FilterState = {
    logFilters: {
        logId: null,
        searchterm: null,
        creationTime: null,
        origin: null,
        subType: null,
        orderBy: 'creationTime',
        orderDirection: OrderDirection.Descending,
        pageSize: 16,
        pageNumber: 1
    }
};

// Merge tools
const mergeOnOverlappingKeys = <T extends object, K extends object>(source: T, mergeObj: K): any => {
    const result = _.mapValues(source, (value: any, key: string) => {
        return mergeObj[key] || value;
    });
    return result;
};

// Reducer
const filterReducer: Reducer<FilterState>
    = (state: FilterState = initialState, action: FilterAction): FilterState => {
        switch (action.type) {
            case ActionTypes.SET_LOG_FILTER:
                return {
                    ...state,
                    logFilters: {
                        ...state.logFilters,
                        [action.payload.key]: action.payload.value || null
                    }
                };
            case ActionTypes.SET_LOG_FILTERS:
                return {
                    ...state,
                    logFilters: {
                        ...mergeOnOverlappingKeys(state.logFilters, action.payload)
                    }
                };
            case ActionTypes.RESET_LOG_FILTERS:
                return {
                    ...state,
                    logFilters: {
                        ...initialState.logFilters,
                        pageSize: state.logFilters.pageSize
                    }
                };
            default:
                return state;
        }
    };

export default filterReducer;
