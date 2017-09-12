import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Transaction from './Transaction';
import * as TransactionActions from '../actions';
import FilteredTransactionSelector from '../selectors/filtered_transactions';


const setTransactionsFilter = (props) => {
    const filter = props.params.filter ? +props.params.filter : 0;
    props.setFilter(filter);
};

class FilterNav extends Component {


    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.params.filter !== this.props.params.filter) {
    //         setTransactionsFilter(nextProps);
    //     } else {
    //         return false;
    //     }
    // }

    render() {
        return(
            <nav>
                <NavLink to="/transactions">All</NavLink>
                <NavLink to="/transactions/filter=1">Expenses</NavLink>
                <NavLink to="/transactions/filter=2">Income</NavLink>
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

    console.log(props);

    const items = Object.keys(transactions).map(id => {
        let item = transactions[id];
        return (
            <Transaction key={item.id} item={item} actions={{ remove }} categories={catListById} />
        )
    });

    return(
        <div>
            <FilterNav setFilter={props.setFilter} params={props.match.params} />
            {items}
        </div>
    );
};


// container part
const mapStateToProps = state => ({
    transactions: FilteredTransactionSelector(state),
    categories: [ ...state.categories.list ],
    routing: state.routing
});

const mapDispatchToProps = dispatch => bindActionCreators({...TransactionActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);