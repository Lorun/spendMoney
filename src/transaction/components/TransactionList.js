import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Transaction from './Transaction';
import * as TransactionActions from '../actions';

// component part
const TransactionList = ({ transactions, categories, remove }) => {
    let catListById = {};
    for (let i=0; i<categories.list.length; i++) {
        catListById[categories.list[i].id] = categories.list[i].name;
    }

    return (
        <div>
            <nav>
                <a href="/">All</a>
                <a href="/expenses">Expenses</a>
                <a href="/income">Income</a>
            </nav>
            {transactions.list.map(item => (
                <Transaction key={item.id} item={item} actions={{ remove }} categories={catListById} />
            ))}
        </div>
    )
};


// container part
const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => bindActionCreators({...TransactionActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);