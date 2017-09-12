import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import transactions from './transaction/reducer';
import categories from './category/reducer';

const browserHistory = createBrowserHistory();

const middleware = routerMiddleware(browserHistory);

const rootReducer = combineReducers({
    transactions,
    categories,
    routing: routerReducer
});

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(middleware)
);

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;

//export const history = browserHistory;
export const history = syncHistoryWithStore(browserHistory, store);