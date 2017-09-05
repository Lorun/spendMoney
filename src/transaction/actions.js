import * as t from './actionTypes';

let idCounter = 1000;

export const add = ({ amount, date, description, category }) => ({
    type: t.ADD,
    payload: {
        id: ++idCounter,
        amount,
        date,
        description,
        category
    }
});

export const del = id => ({
    type: t.DELETE,
    id
});