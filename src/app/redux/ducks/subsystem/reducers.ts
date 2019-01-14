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
    fetchingSubsystems: false,
    fetchingSubsystem: false,
    fetchingSubsystemOverviews: false,
    fetchingSubsystemPermissions: false,
    creatingToken: false,
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
                    fetchingSubsystems: true
                };
            case ActionTypes.FETCH_SUBSYSTEMS_SUCCESS:
                return {
                    ...state,
                    fetchingSubsystems: false,
                    subsystems: action.payload
                };
            case ActionTypes.FETCH_SUBSYSTEM_REQUEST:
                return {
                    ...state,
                    fetchingSubsystem: true
                };
            case ActionTypes.FETCH_SUBSYSTEM_SUCCESS:
                return {
                    ...state,
                    fetchingSubsystem: false,
                    current: action.payload
                };
            case ActionTypes.FETCH_SUBSYSTEM_OVERVIEWS_REQUEST:
                return {
                    ...state,
                    fetchingSubsystemOverviews: true
                };
            case ActionTypes.FETCH_SUBSYSTEM_OVERVIEWS_SUCCESS:
                return {
                    ...state,
                    fetchingSubsystemOverviews: false,
                    subsystemOverviews: action.payload
                };
            case ActionTypes.CREATE_TOKEN_REQUEST:
                return {
                    ...state,
                    creatingToken: true
                };
            case ActionTypes.CREATE_TOKEN_SUCCESS:
                return {
                    ...state,
                    creatingToken: false
                };
            case ActionTypes.FETCH_SUBSYSTEM_PERMISSIONS_REQUEST:
                return {
                    ...state,
                    fetchingSubsystemPermissions: true
                };
            case ActionTypes.FETCH_SUBSYSTEM_PERMISSIONS_SUCCESS:
                return {
                    ...state,
                    fetchingSubsystemPermissions: false,
                    subsystemPermissions: action.payload
                };
            default:
                return state;
        }
    };

export default subsystemReducer;
