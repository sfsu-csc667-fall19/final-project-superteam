const DEFAULT_STATE = {
    messages: [],
};

const messagesReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_MESSAGES':
            return {
                ...state,
                messages: action.messages,
            };
        default:
            return state;
    }
};

export default messagesReducer;
