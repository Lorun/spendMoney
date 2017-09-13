import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Transaction from './Transaction';
import * as TransactionActions from '../actions';
import FilteredTransactionSelector from '../selectors/filtered_transactions';


class FilterNav extends Component {

    onSelect(filter) {
        return () => {
            this.props.setFilter(filter);
        }
    }

    render() {
        return(
            <nav>
                <button onClick={this.onSelect(0)} className={this.props.filter === 0 ? 'is-active' : ''}>All</button>
                <button onClick={this.onSelect(1)} className={this.props.filter === 1 ? 'is-active' : ''}>Expenses</button>
                <button onClick={this.onSelect(2)} className={this.props.filter === 2 ? 'is-active' : ''}>Income</button>
            </nav>
        );
    }
}


// component part
const TransactionList = (props) => {
    const { transactions, categories, remove } = props;
    let catListById = {};
    categories.map((cat) => {
        catListById[cat.id] = cat.name;
        return true;
    });

    const items = Object.keys(transactions).map(id => {
        let item = transactions[id];
        return (
            <Transaction key={item.id} item={item} actions={{ remove }} categories={catListById} />
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
    categories: [ ...state.categories.list ]
});

const mapDispatchToProps = dispatch => bindActionCreators({...TransactionActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);