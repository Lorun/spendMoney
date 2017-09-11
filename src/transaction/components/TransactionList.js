import React from 'react';
import { createConnection } from '../../utils';
import { NavLink } from 'react-router-dom';
import Transaction from './Transaction';
import * as TransactionActions from '../actions';
import FilteredTransactionList from '../selectors/filtered_transactions';


// component part
const TransactionList = (props) => {
    const { transactions, categories, remove } = props;
    let catListById = {};
    categories.list.map((cat) => {
        catListById[cat.id] = cat.name;
        return true;
    });

    const items = Object.keys(transactions.list).map(id => {
        let item = transactions.list[id];
        return (
            <Transaction key={item.id} item={item} actions={{ remove }} categories={catListById} />
        )
    });

    return (
        <div>
            <nav>
                <NavLink to="/transactions">All</NavLink>
                <NavLink to="/transactions/filter=expenses">Expenses</NavLink>
                <NavLink to="/transactions/filter=income">Income</NavLink>
            </nav>
            {items}
        </div>
    )
};


// container part
export default createConnection(TransactionList, TransactionActions, ['transactions', 'categories']);