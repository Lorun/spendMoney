import * as t from './actionTypes';

export const add = ({ id, transaction_type, amount, date, description, category }) => ({
    type: t.ADD,
    payload: {
        id,
        transaction_type,
        amount,
        date,
        description,
        category
    }
});

export const edit = ({ id, transaction_type, amount, date, description, category }) => ({
    type: t.EDIT,
    payload: {
        id,
        transaction_type,
        amount,
        date,
        description,
        category
    }
});

export const remove = id => ({
    type: t.REMOVE,
    id
});

export const incrementId = () => ({
    type: t.INCREMENT_ID
});