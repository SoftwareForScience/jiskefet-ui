/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer, combineReducers } from 'redux';
import { FilterAction, ActionTypes, NamedAction, FilterName } from './types';
import { OrderDirection } from '../../../enums/OrderDirection';
import * as _ from 'lodash';
import { FilterState, FilterValue } from '../../../interfaces/Filter';

// Initial state
const getInitialState = (name: FilterName): FilterState | {} => {
    switch (name) {
        case FilterName.LOG: {
            return {
                logId: null,
                searchterm: null,
                creationTime: null,
                origin: null,
                subType: null,
                orderBy: 'creationTime',
                orderDirection: OrderDirection.Descending,
                pageSize: 16,
                pageNumber: 1,
            };
        }
        case FilterName.RUN:
            return {
                runId: null,
                activityId: null,
                runType: null,
                runQuality: null,
                startTimeO2Start: null,
                endTimeO2Start: null,
                startTimeO2End: null,
                endTimeO2End: null,
                startTimeTrgStart: null,
                endTimeTrgStart: null,
                startTimeTrgEnd: null,
                endTimeTrgEnd: null,
                orderBy: null,
                orderDirection: null,
                pageSize: 16,
                pageNumber: 1,
            };
        case FilterName.SUBSYSTEM:
            return {
                orderBy: null,
                orderDirection: null,
                timeRange: null,
            };
        case FilterName.USER_LOG:
            return {
                orderBy: null,
                orderDirection: null,
                pageSize: 16,
                pageNumber: 1,
            };
        default:
            return {};
    }
};

// Merge tools
/**
 * Puts the value of a mergeObj key into the source, for each key that they have in common.
 * @param source
 * @param mergeObj
 */
const mergeOverlappingKeys = (source: FilterState, mergeObj: FilterState): FilterState => {
    const result = _.mapValues(source, (value: FilterValue, key: string) => {
        return mergeObj[key] || value;
    });
    return result;
};

// Reducer
const filterReducer: Reducer<FilterState>
    = (state: FilterState, action: FilterAction): FilterState => {
        if (!state || _.isEmpty(state)) {
            state = getInitialState(action.name);
        }
        switch (action.type) {
            case ActionTypes.SET_FILTER:
                return {
                    ...state,
                    [action.payload.key]: action.payload.value || null
                };
            case ActionTypes.SET_FILTERS:
                return {
                    ...mergeOverlappingKeys(state, action.payload)
                };
            case ActionTypes.RESET_FILTERS:
                return {
                    ...getInitialState(action.name),
                    pageSize: state.pageSize
                };
            default:
                return state;
        }
    };

const createNamedWrapperReducer = (reducerFunction: Reducer<FilterState>, reducerName: FilterName) => {
    return (state: FilterState, action: NamedAction) => {
        const { name } = action;
        const isInitializationCall = state === undefined;
        if (name !== reducerName && !isInitializationCall) {
            return state;
        }
        return reducerFunction(state, action);
    };
};

const rootReducer = combineReducers({
    logFilters: createNamedWrapperReducer(filterReducer, FilterName.LOG),
    runFilters: createNamedWrapperReducer(filterReducer, FilterName.RUN),
    subsystemFilters: createNamedWrapperReducer(filterReducer, FilterName.SUBSYSTEM),
    userLogFilters: createNamedWrapperReducer(filterReducer, FilterName.USER_LOG),
});

export default rootReducer;
