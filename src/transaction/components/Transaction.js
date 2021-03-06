import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import './transaction.css';

// component part
export const Transaction = ({ item, categories, actions }) => {
    const { id, transaction_type, amount, date, description, category } = item;
    const className = transaction_type === 1 ? 'transaction transaction--expenses' : 'transaction transaction--income';
    return(
        <div className={className}>
            <div className="transaction-amount">{ amount }</div>
            <div className="transaction-category">{ categories[category] }</div>
            <div className="transaction-description">{ description }</div>
            <div className="transaction-info">
                <span className="transaction-date">{ moment(date, 'x').format('DD MMM YYYY') }</span>
                <div className="transaction-buttons">
                    <NavLink to={"/transactions/edit="+id} className="btn btn--small">Edit</NavLink>
                    <button onClick={() => actions.remove(id)} className="btn btn--small btn--delete">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Transaction;