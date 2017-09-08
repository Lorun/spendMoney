import * as t from './actionTypes';

const ACTION_HANDLERS = {
    [t.ADD]: (state, action) => ({
        ...state,
        list: {
            ...state.list,
            [action.payload.id]: action.payload
        }
    }),
    [t.EDIT]: (state, action) => ({
        ...state,
        list: {
            ...state.list,
            [action.payload.id]: action.payload
        }
    }),
    [t.REMOVE]: (state, action) => ({
        ...state,
        list: state.list.filter(item => item.id !== action.id)
    }),
    [t.INCREMENT_ID]: (state, action) => ({
        ...state,
        lastId: state.lastId + 1
    })
};

const initialState = {
    list: {},
    lastId: 1000,
};

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}