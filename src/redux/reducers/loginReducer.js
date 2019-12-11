const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    loggedInUser: [],
    isLoggedIn: false,
  };
  
  // Step 2 create listener function
  const loginReducer = (state = INITIAL_STATE, action) => {
    // Step 3 create switch for action types
    switch (action.type) {
        case 'SET_USERNAME':
            return {
            ...state, 
            username: action.username,
            };
        case 'SET_IS_LOGGED_IN':
            return {
            ...state,
            isLoggedIn: action.isLoggedIn,
            };
        case 'SET_EMAIL':
            return {
            ...state, 
            email: action.email,
            };
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.password,
            };
        case 'SET_LOGGED_IN_USER':
            return {
                ...state,
                loggedInUser: [...state.loggedInUser, action.loggedInUser],
            };
      default:
        return state;
    }
  };
  
  export default loginReducer;
  
  