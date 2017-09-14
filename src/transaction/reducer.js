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
    [t.REMOVE]: (state, action) => {
        let list = {...state.list};
        delete list[action.id];

        return {
            ...state,
            list
        };
    },
    [t.INCREMENT_ID]: (state, action) => ({
        ...state,
        lastId: state.lastId + 1
    }),
    [t.SET_FILTER]: (state, action) => ({
        ...state,
        filter: action.filter
    })
};

const initialState = {
    list: {},
    lastId: 1000,
    filter: 0
};

export default (state = initialState, action) => {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}