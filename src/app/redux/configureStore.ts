/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { RootState, RootActions, Store } from './types';
import { subsystem } from './ducks';

/**
 * This file creates the store based on rootReducer.ts and the applied middleware.
 */

/**
 * Combines all reducers into a single reducer to create the store with.
 */
const rootReducer = combineReducers<RootState>({
    subsystem
});

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
