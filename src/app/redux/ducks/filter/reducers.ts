/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer, combineReducers } from 'redux';
import { FilterAction, ActionTypes } from './types';
import { OrderDirection } from '../../../enums/OrderDirection';
import * as _ from 'lodash';
import { IFilterState, FilterValue, FilterName } from '../../../interfaces/Filter';
import { createNamedWrapperReducer } from '../../utils/reducerWrappers';

// Initial state

/**
 * Returns the initial state for the name given.
 * @param name The name identifier for the state.
 */
const getInitialState = (name: FilterName): IFilterState | {} => {
    switch (name) {
        case FilterName.Log: {
            return {
                logId: null,
                searchterm: null,
                creationTime: null,
                origin: null,
                subType: null,
                orderBy: 'logId',
                orderDirection: OrderDirection.Descending,
                pageSize: 20,
                pageNumber: 1,
            };
        }
        case FilterName.Run:
            return {
                runNumber: null,
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
                pageSize: 20,
                pageNumber: 1,
            };
        case FilterName.Subsystem:
            return {
                orderBy: 'subsystemName',
                orderDirection: 'ASC',
                timeRange: 24,
            };
        case FilterName.UserLog:
            return {
                orderBy: null,
                orderDirection: null,
                pageSize: 20,
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
const mergeOverlappingKeys = (source: IFilterState, mergeObj: IFilterState): IFilterState => {
    const result = _.mapValues(source, (value: FilterValue, key: string) => {
        return mergeObj[key] || value;
    });
    return result;
};

// Reducer
const filterReducer: Reducer<IFilterState>
    = (state: IFilterState, action: FilterAction): IFilterState => {
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

const rootReducer = combineReducers({
    [FilterName.Log]: createNamedWrapperReducer<IFilterState, FilterName>(filterReducer, FilterName.Log),
    [FilterName.Run]: createNamedWrapperReducer<IFilterState, FilterName>(filterReducer, FilterName.Run),
    [FilterName.Subsystem]: createNamedWrapperReducer<IFilterState, FilterName>(filterReducer, FilterName.Subsystem),
    [FilterName.UserLog]: createNamedWrapperReducer<IFilterState, FilterName>(filterReducer, FilterName.UserLog),
});

export default rootReducer;
