/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { createStore, applyMiddleware, combineReducers, AnyAction, Reducer } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, RootActions, Store } from './types';
import { subsystem, success, ui, attachment, auth, filter, error, user, run, log, tag } from './ducks';
import { ActionTypes as AuthActionTypes } from './ducks/auth/types';
import { RootFilterState } from './ducks/filter/types';

/**
 * This file creates the store based by combining all reducers into a single reducer and applying middleware.
 */

/**
 * Combines all reducers into a single reducer to create the store with.
 */
const appReducer = combineReducers<RootState>({
    subsystem,
    success,
    ui,
    attachment,
    auth,
    filter: filter as Reducer<RootFilterState, AnyAction>,
    error,
    user,
    run,
    log,
    tag
});

const rootReducer = (state: RootState | undefined, action: RootActions) => {
    if (action.type === AuthActionTypes.USER_LOGOUT) {
        state = undefined;
    }
    return appReducer(state, action);
};

/**
 * The single redux store with middleware.
 */
const configureStore = (): Store<RootState> => {
    return createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk as ThunkMiddleware<RootState, RootActions>),
        )
    );
};

export const store = configureStore();
