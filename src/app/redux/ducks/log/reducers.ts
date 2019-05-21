/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer } from 'redux';
import { ActionTypes, LogState, LogAction } from './types';

// Initial state
const initialState: LogState = {
    isFetchingThread: false,
    isFetchingLogs: false,
    isFetchingLog: false,
    isPatchingLinkRunToLog: false,
    isCreatingLog: false,
    logs: [],
    count: 0,
    current: null,
    logToBeCreated: null,
    thread: null
};

// Reducer
const logReducer: Reducer<LogState>
    = (state: LogState = initialState, action: LogAction): LogState => {
        switch (action.type) {
            case ActionTypes.FETCH_THREAD_REQUEST:
                return {
                    ...state,
                    isFetchingThread: true
                };
            case ActionTypes.FETCH_THREAD_SUCCESS:
                return {
                    ...state,
                    isFetchingThread: false,
                    thread: action.payload.data.item
                };
            case ActionTypes.FETCH_LOGS_REQUEST:
                return {
                    ...state,
                    isFetchingLogs: true
                };
            case ActionTypes.FETCH_LOGS_SUCCESS:
                return {
                    ...state,
                    isFetchingLogs: false,
                    logs: [...action.payload.data.items],
                    count: action.payload.data.count
                };
            case ActionTypes.CREATE_LOG_REQUEST:
                return {
                    ...state,
                    isCreatingLog: true
                };
            case ActionTypes.CREATE_LOG_SUCCESS:
                return {
                    ...state,
                    isCreatingLog: false
                };
            case ActionTypes.SET_LOG_TO_BE_CREATED:
                return {
                    ...state,
                    logToBeCreated: action.payload
                };
            case ActionTypes.CLEAR_LOG_TO_BE_CREATED:
                return {
                    ...state,
                    logToBeCreated: null
                };
            case ActionTypes.FETCH_LOG_REQUEST:
                return {
                    ...state,
                    isFetchingLog: true
                };
            case ActionTypes.FETCH_LOG_SUCCESS:
                return {
                    ...state,
                    isFetchingLog: false,
                    current: action.payload.data.item
                };
            case ActionTypes.LINK_RUN_TO_LOG_REQUEST:
                return {
                    ...state,
                    isPatchingLinkRunToLog: true
                };
            case ActionTypes.LINK_RUN_TO_LOG_SUCCESS:
                return {
                    ...state,
                    isPatchingLinkRunToLog: false
                };
            default:
                return state;
        }
    };

export default logReducer;
