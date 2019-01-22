/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { Reducer } from 'redux';
import { ErrorState, ErrorAction, ActionTypes } from './types';

// Initial state
const initialState: ErrorState = {
    httpErrors: [],
    errorHistory: []
};

/**
 * Add the given errors to the errorHistory array.
 *
 * @param errors The errors to add to the errorHistory.
 * @param errorHistory The current errorHistory.
 * @param maxItems The max amount of errors in the errorHistory array.
 */
const addToErrorHistory = (errors: object[], errorHistory: object[], maxItems: number = 50): object[] => {
    let newErrorHistory = errorHistory;
    newErrorHistory = [
        ...newErrorHistory,
        ...errors
    ];
    if (newErrorHistory.length > maxItems) {
        newErrorHistory.splice(0, newErrorHistory.length - maxItems);
    }
    return newErrorHistory;
};

// Reducer
const errorReducer: Reducer<ErrorState>
    = (state: ErrorState = initialState, action: ErrorAction): ErrorState => {
        switch (action.type) {
            case ActionTypes.ADD_HTTP_ERROR:
                return {
                    ...state,
                    httpErrors: [
                        ...state.httpErrors,
                        action.payload
                    ]
                };
            case ActionTypes.CLEAR_HTTP_ERRORS:
                return {
                    ...state,
                    httpErrors: [],
                    errorHistory: addToErrorHistory(state.httpErrors, state.errorHistory)
                };
            default:
                return state;
        }
    };

export default errorReducer;
