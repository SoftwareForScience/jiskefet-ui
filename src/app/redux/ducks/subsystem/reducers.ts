/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer } from 'redux';
import { SubsystemState, SubsystemAction, ActionTypes } from './types';

// Initial state
const initialState: SubsystemState = {
    isFetchingSubsystems: false,
    isFetchingSubsystem: false,
    isFetchingSubsystemOverviews: false,
    isFetchingSubsystemPermissions: false,
    isCreatingToken: false,
    subsystems: [],
    current: null,
    subsystemOverviews: [],
    subsystemPermissions: []
};

// Reducer
const subsystemReducer: Reducer<SubsystemState>
    = (state: SubsystemState = initialState, action: SubsystemAction): SubsystemState => {
        switch (action.type) {
            case ActionTypes.FETCH_SUBSYSTEMS_REQUEST:
                return {
                    ...state,
                    isFetchingSubsystems: true
                };
            case ActionTypes.FETCH_SUBSYSTEMS_SUCCESS:
                return {
                    ...state,
                    isFetchingSubsystems: false,
                    subsystems: [...action.payload.data.items]
                };
            case ActionTypes.FETCH_SUBSYSTEM_REQUEST:
                return {
                    ...state,
                    isFetchingSubsystem: true
                };
            case ActionTypes.FETCH_SUBSYSTEM_SUCCESS:
                return {
                    ...state,
                    isFetchingSubsystem: false,
                    current: action.payload.data.item
                };
            case ActionTypes.FETCH_SUBSYSTEM_OVERVIEWS_REQUEST:
                return {
                    ...state,
                    isFetchingSubsystemOverviews: true
                };
            case ActionTypes.FETCH_SUBSYSTEM_OVERVIEWS_SUCCESS:
                return {
                    ...state,
                    isFetchingSubsystemOverviews: false,
                    subsystemOverviews: action.payload.data.items
                };
            case ActionTypes.CREATE_TOKEN_REQUEST:
                return {
                    ...state,
                    isCreatingToken: true
                };
            case ActionTypes.CREATE_TOKEN_SUCCESS:
                return {
                    ...state,
                    isCreatingToken: false
                };
            case ActionTypes.FETCH_SUBSYSTEM_PERMISSIONS_REQUEST:
                return {
                    ...state,
                    isFetchingSubsystemPermissions: true
                };
            case ActionTypes.FETCH_SUBSYSTEM_PERMISSIONS_SUCCESS:
                return {
                    ...state,
                    isFetchingSubsystemPermissions: false,
                    subsystemPermissions: action.payload.data.items
                };
            default:
                return state;
        }
    };

export default subsystemReducer;
