import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TransactionActions from '../actions';

// component part
export function TransactionList({ list, del }) {
    console.log(del);
    return(
        <div className="transactionList">
            111
            {/*<div className="transaction-amount">{ amount }</div>
            <div className="transaction-info">{ date }, { category }</div>
            <div className="transaction-description">{ description }</div>*/}
        </div>
    );
}

// container part
function mapStateToProps(state) {
    return { ...state.transactions };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...TransactionActions,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);