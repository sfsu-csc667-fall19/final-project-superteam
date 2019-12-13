const INITIAL_STATE = {
    isLoading: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading,
            };
        default:
            return state;
    }
};

export default userReducer;