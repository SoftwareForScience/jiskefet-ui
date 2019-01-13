/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { createStore, applyMiddleware, Store as ReduxStore } from 'redux';
import rootReducer, { RootState, RootActions } from './index';
import thunk, { ThunkMiddleware, ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * This file creates the store based on the root types/objects from rootReducer.ts
 * and the applied middleware.
 */

/**
 * Extend dispatch to allow thunks (functions) to be given to dispatch, instead of only objects.
 */
interface Store<S> extends ReduxStore<S> {
    dispatch: ThunkDispatch<S, undefined, RootActions>;
}

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
