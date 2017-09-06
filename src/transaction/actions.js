import * as t from './actionTypes';

export const add = ({ id, amount, date, description, category }) => ({
    type: t.ADD,
    payload: {
        id,
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