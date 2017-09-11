import { createSelector } from 'reselect';

const transactionsSelector = state => state.transaction.list;

const filterSelector = state => state.tranaction.filter;

const getTransactions = (transactions, filter) => {
    return Object.keys(transactions).filter(id => {
        return filter === 0 ? true : transactions[id].transaction_type === filter;
    });
};

export default createSelector(
    transactionsSelector,
    filterSelector,
    getTransactions
);