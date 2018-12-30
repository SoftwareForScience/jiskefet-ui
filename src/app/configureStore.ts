import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/rootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * The single redux store with middleware.
 */
export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk),
    )
);
