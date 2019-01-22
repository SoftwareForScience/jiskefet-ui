/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer } from 'redux';
import { ActionTypes, RunState, RunAction } from './types';

// Initial state
const initialState: RunState = {
    isFetchingRuns: false,
    isFetchingRun: false,
    isPatchingLinkLogToRun: false,
    runs: [],
    count: 0,
    current: null,
};

// Reducer
const runReducer: Reducer<RunState>
    = (state: RunState = initialState, action: RunAction): RunState => {
        switch (action.type) {
            case ActionTypes.FETCH_RUNS_REQUEST:
                return {
                    ...state,
                    isFetchingRuns: true
                };
            case ActionTypes.FETCH_RUNS_SUCCESS:
                return {
                    ...state,
                    isFetchingRuns: false,
                    runs: [...action.payload.data.items],
                    count: action.payload.data.count
                };
            case ActionTypes.FETCH_RUN_REQUEST:
                return {
                    ...state,
                    isFetchingRun: true
                };
            case ActionTypes.FETCH_RUN_SUCCESS:
                return {
                    ...state,
                    isFetchingRun: false,
                    current: action.payload.data.item
                };
            case ActionTypes.LINK_LOG_TO_RUN_REQUEST:
                return {
                    ...state,
                    isPatchingLinkLogToRun: true
                };
            case ActionTypes.LINK_LOG_TO_RUN_SUCCESS:
                return {
                    ...state,
                    isPatchingLinkLogToRun: false
                };
            default:
                return state;
        }
    };

export default runReducer;
