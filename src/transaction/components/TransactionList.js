import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Transaction from './Transaction';
import * as TransactionActions from '../actions';

// component part
export const TransactionList = ({ list, remove }) => (
    <div>
        {list.map(item => (
            <Transaction key={item.id} item={item} actions={{ remove }} />
        ))}
    </div>
);


// container part
const mapStateToProps = state => ({...state.transactions});

const mapDispatchToProps = dispatch => bindActionCreators({...TransactionActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);