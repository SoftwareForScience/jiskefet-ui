/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer } from 'redux';
import { AuthState, AuthAction, ActionTypes } from './types';

// Initial state
const initialState: AuthState = {
    profile: null,
    token: null,
    isAuthorizing: false,
    isFetchingProfile: false
};

// Reducer
const authReducer: Reducer<AuthState>
    = (state: AuthState = initialState, action: AuthAction): AuthState => {
        switch (action.type) {
            case ActionTypes.FETCH_PROFILE_REQUEST:
                return {
                    ...state,
                    isFetchingProfile: true
                };
            case ActionTypes.FETCH_PROFILE_SUCCESS:
                return {
                    ...state,
                    isFetchingProfile: false,
                    profile: action.payload.data.item
                };
            case ActionTypes.AUTHORIZE_REQUEST:
                return {
                    ...state,
                    isAuthorizing: true
                };
            case ActionTypes.AUTHORIZE_SUCCESS:
                return {
                    ...state,
                    isAuthorizing: false,
                    token: action.payload.token
                };
            default:
                return state;
        }
    };

export default authReducer;
