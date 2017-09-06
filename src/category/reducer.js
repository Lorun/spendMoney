import * as t from './actionTypes';

const ACTION_HANDLERS = {
    [t.ADD]: (state, action) => ({
        ...state,
        list: [
            action.payload,
            ...state.list
        ]
    }),
    [t.REMOVE]: (state, action) => ({
        ...state,
        list: state.list.filter(item => item.id !== action.id)
    })
};

const initialState = {
    list: [
        {
            id: 1,
            name: 'Food'
        },
        {
            id: 2,
            name: 'Entertainment'
        },
        {
            id: 3,
            name: 'Shopping'
        },
        {
            id: 4,
            name: 'Travel'
        }
    ],
    lastId: 4,
};

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}