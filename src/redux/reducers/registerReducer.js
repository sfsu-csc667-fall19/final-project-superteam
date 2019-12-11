const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    isUserCreated: false
  };
  
  const registerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.username,
            }
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
        case 'SET_IS_USER_CREATED':
            return {
                ...state,
                isUserCreated: action.isUserCreated,
        };
      default:
        return state;
    }
  };
  
  export default registerReducer;
  
  