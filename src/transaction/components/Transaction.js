import React from 'react';

// component part
export const Transaction = ({ item, categories, actions }) => {
    const { id, amount, date, description, category } = item;
    return(
        <div className="transaction">
            <div className="transaction-amount">{ amount }</div>
            <div className="transaction-info">{ date }, { categories[category] } <button onClick={() => actions.remove(id)}>Delete</button></div>
            <div className="transaction-description">{ description }</div>
        </div>
    );
}

export default Transaction;