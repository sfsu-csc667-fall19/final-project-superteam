const INITIAL_STATE = {
    user: [],
    isLoggedIn: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};

export default userReducer;