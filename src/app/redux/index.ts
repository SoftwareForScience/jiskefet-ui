/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import { combineReducers } from 'redux';
import { subsystemReducer, SubsystemState, SubsystemAction } from './subsystem';

/**
 * This file combines redux state, actions and reducers into a root type/object.
 */

/**
 * The definition of the Redux state/store of the entire Jiskefet app.
 */
export interface RootState {
    subsystem: SubsystemState;
}

/**
 * All possible actions in the app.
 */
export type RootActions = SubsystemAction;

/**
 * Combines all reducers into a single reducer to create the store with.
 * Store creation happens in configureStore.ts
 */
const rootReducer = combineReducers<RootState>({
    subsystem: subsystemReducer
});

export default rootReducer;
