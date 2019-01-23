/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer } from 'redux';
import { UserState, UserAction, ActionTypes } from './types';

// Initial state
const initialState: UserState = {
    IsFetchingUser: false,
    IsFetchingLogs: false,
    logCount: 0,
    logs: [],
    user: null,
    current: null
};

// Reducer
const userReducer: Reducer<UserState>
    = (state: UserState = initialState, action: UserAction): UserState => {
        switch (action.type) {
            case ActionTypes.FETCH_USER_REQUEST:
                return {
                    ...state,
                    IsFetchingUser: true
                };
            case ActionTypes.FETCH_USER_SUCCESS:
                return {
                    ...state,
                    IsFetchingUser: false,
                    user: action.payload.data.item
                };
            case ActionTypes.FETCH_LOGS_FOR_USER_REQUEST:
                return {
                    ...state,
                    IsFetchingLogs: true
                };
            case ActionTypes.FETCH_LOGS_FOR_USER_SUCCES:
                return {
                    ...state,
                    IsFetchingLogs: false,
                    logs: [...action.payload.data.items],
                    logCount: action.payload.data.count
                };
            default:
                return state;
        }
    };

export default userReducer;
