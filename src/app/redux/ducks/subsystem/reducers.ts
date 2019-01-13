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
    subsystems: [],
    current: null
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
            default:
                return state;
        }
    };

export default subsystemReducer;
