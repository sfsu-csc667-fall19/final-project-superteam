import axios from 'axios';
import md5 from 'md5';

export const setEmail = email => ({ 
    type: 'SET_EMAIL',
    email,
  });

export const setUsername = username => ({
    type: 'SET_USERNAME',
    username,
});

export const setPassword = password => ({ 
    type: 'SET_PASSWORD',
    password,
});

export const setIsUserCreated = isUserCreated => ({ 
    type: 'SET_IS_USER_CREATED',
    isUserCreated,
});

export const createNewuser = () => (dispatch, getState) => {
    const { username, email, password } = getState().registerReducer;
    return axios.post('/service1/register', {
        username: username,
        email: email,
        password: md5(password),
    })
    .then( response => {
        if(response.data === true) {
            return true;
        }else{
            return false;
        }
    })
    .catch(error => {
        console.log(error);
    });
}







  