import { combineReducers, createStore } from 'redux';
import transactions from './transaction/reducer';
import categories from './category/reducer';

const rootReducer = combineReducers({
    transactions,
    categories,
});

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;