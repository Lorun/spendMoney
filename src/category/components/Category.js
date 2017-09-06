import React from 'react';

// component part
export const Transaction = ({ item, actions }) => {
    const { id, name} = item;
    return(
        <div className="category">
            <div className="category-name">{ name } <button onClick={() => actions.remove(id)}>Delete</button></div>
        </div>
    );
}

export default Transaction;