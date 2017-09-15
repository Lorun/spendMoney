import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Transaction from './Transaction';
import * as TransactionActions from '../actions';
import FilteredTransactionSelector from '../selectors/filtered_transactions';
import getCategoriesById from '../selectors/categories';


class FilterNav extends Component {

    onSelect(filter) {
        return () => {
            this.props.setFilter(filter);
        }
    }

    getClassName(filter) {
        return 'btn ' + (this.props.filter === filter ? 'is-active' : '');
    }

    render() {
        return(
            <nav className="transaction-filter">
                <button onClick={this.onSelect(0)} className={this.getClassName(0)}>All</button>
                <button onClick={this.onSelect(1)} className={this.getClassName(1)}>Expenses</button>
                <button onClick={this.onSelect(2)} className={this.getClassName(2)}>Income</button>
            </nav>
        );
    }
}


// component part
const TransactionList = (props) => {
    const { transactions, categories, remove } = props;

    const items = Object.keys(transactions).map(id => {
        let item = transactions[id];
        return (
            <Transaction key={item.id} item={item} actions={{ remove }} categories={categories} />
        )
    });

    return(
        <div>
            <FilterNav setFilter={props.setFilter} filter={props.filter} params={props.match.params} />
            {items}
        </div>
    );
};


// container part
const mapStateToProps = state => ({
    transactions: FilteredTransactionSelector(state),
    filter: state.transactions.filter,
    categories: getCategoriesById(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({...TransactionActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);