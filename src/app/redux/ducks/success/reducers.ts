/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer } from 'redux';
import { ActionTypes, SuccessState, SuccessAction } from './types';

// Initial state
const initialState: SuccessState = {
    successList: []
};

// Reducer
const errorReducer: Reducer<SuccessState>
    = (state: SuccessState = initialState, action: SuccessAction): SuccessState => {
        switch (action.type) {
            case ActionTypes.ADD_SUCCESS_MESSAGE:
                return {
                    ...state,
                    successList: [
                        ...state.successList,
                        action.payload
                    ]
                };
            case ActionTypes.CLEAR_SUCCESS_MESSAGES:
                return {
                    ...state,
                    successList: []
                };
            default:
                return state;
        }
    };

export default errorReducer;
