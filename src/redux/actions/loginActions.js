import axios from 'axios';
import md5 from 'md5';
import jwt_decode from 'jwt-decode'

export const setEmail = email => ({ 
    type: 'SET_EMAIL',
    email,
  });
export const setUsername = username => ({ 
    type: 'SET_USERNAME',
    username,
});

export const setLoggedInUser = loggedInUser=> ({ 
    type: 'SET_LOGGED_IN_USER',
    loggedInUser,
});

export const setPassword = password => ({ 
    type: 'SET_PASSWORD',
    password,
});

export const setIsLoggedIn = isLoggedIn => ({
    type: 'SET_IS_LOGGED_IN',
    isLoggedIn,
});

export const verifyUser = () => (dispatch, getState) => {
    const { email, password, loggedInUser } = getState().loginReducer;
    return axios.post('/service1/login', {
        email: email,
        password: md5(password),
    })
    .then(response => {
        if(response.data.response === true) {
            dispatch(setUsername(response.data.name));
            dispatch(setLoggedInUser(response.data.name));
            return true;
        }else{
            return false;
        }
    })
    .catch(err => {
        console.log('error: ' + err);
    })
}