import { combineReducers } from 'redux';
import transactions from './transaction/reducer';

export default combineReducers({
    transactions,
});