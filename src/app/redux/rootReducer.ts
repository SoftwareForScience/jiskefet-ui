import { combineReducers } from 'redux';
import { subsystemReducer } from './subsystem';

/**
 * Combines all reducers into a single reducer to create the store with.
 */
const rootReducer = combineReducers({
    subsystemReducer
});

export default rootReducer;
