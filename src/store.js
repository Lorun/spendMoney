import { createStore, combineReducers } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import transactions from './transaction/reducer';
import categories from './category/reducer';

const browserHistory = createBrowserHistory();


const rootReducer = combineReducers({
    transactions,
    categories
});

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;

export const history = browserHistory;