import { createSelector } from 'reselect';

const transactionsSelector = state => state.transactions.list;

const filterSelector = state => state.transactions.filter;

const getTransactions = (transactions, filter) => {
    let FilteredTransactions = [];
    Object.keys(transactions).map(id => {
        if (filter === 0 || transactions[id].transaction_type === filter) {
            FilteredTransactions.push(transactions[id]);
        }
        return false;
    });
    FilteredTransactions.sort((prev, next) => prev.date < next.date);

    return FilteredTransactions;
};

export default createSelector(
    transactionsSelector,
    filterSelector,
    getTransactions
);