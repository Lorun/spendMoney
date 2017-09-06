import React from 'react';

const TransactionForm = ({ item, actions }) => {
    const { id, amount, date, description, category } = item;
    return(
        <div className="transaction">
            <div className="transaction-amount">{ amount }</div>
            <div className="transaction-info">{ date }, { category } <button onClick={() => actions.remove(id)}>Delete</button></div>
            <div className="transaction-description">{ description }</div>
        </div>
    );
}

export default TransactionForm;