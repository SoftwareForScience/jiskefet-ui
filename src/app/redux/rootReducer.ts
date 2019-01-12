import { combineReducers } from 'redux';
import { subsystemReducer, SubsystemState, SubsystemAction } from './subsystem';

/**
 * The definition of the Redux state/store of the entire Jiskefet app.
 */
export interface AppState {
    subsystem: SubsystemState;
}

/**
 * All possible actions in the app.
 */
export type Actions = SubsystemAction;

/**
 * Combines all reducers into a single reducer to create the store with.
 * Store creation happens in configureStore.ts
 */
const rootReducer = combineReducers<AppState>({
    subsystem: subsystemReducer
});

export default rootReducer;
