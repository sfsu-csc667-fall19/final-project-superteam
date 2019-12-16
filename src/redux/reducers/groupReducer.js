const INITIAL_STATE = {
    groups: [],
    group: {},
};

const groupReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_GROUPS':
            return {
                ...state,
                groups: action.groups,
            };
        case 'UPDATE_GROUP':
            return {
                ...state,
                group: action.group,
            };
        case 'INSERT_GROUP':
            return {
                ...state,
                groups: [...state.groups, action.newGroup],
            };
        default:
            return state;
    }
};

export default groupReducer;