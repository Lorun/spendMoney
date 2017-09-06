import * as t from './actionTypes';

let idCounter = 0;

export const add = (name) => ({
    type: t.ADD,
    payload: {
        id: ++idCounter,
        name
    }
});

export const remove = id => ({
    type: t.REMOVE,
    id
});