import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import ChatRoom from './ChatRoom';
import md5 from 'md5';
import { setEmail, setPassword, setIsLoggedIn, verifyUser} from '../redux/actions/loginActions';

const Login = ({dispatch, isLoggedIn, email, password}) => {
    
    const onClick = (e) => {
        console.log('clicked')
        e.preventDefault();
        dispatch(verifyUser()).then(res => {
            if(res === true){
                document.cookie = `email=${email}`;
                document.cookie = `password=${md5(password)}`;
                dispatch(setIsLoggedIn(true))
            }else{
                document.cookie = "email=";
                document.cookie = "pass=";
                dispatch(setIsLoggedIn(false))
            }
        })
    }

    const loginForm = (
        <Form className='container col-sm-3 mt-5'>
                <Form.Label>Sign in</Form.Label>
                <Form.Group>
                    <Form.Control 
                        type='text' 
                        placeholder='email'
                        value={email}
                        onChange = {e => dispatch(setEmail(e.target.value))}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Control 
                        type='password' 
                        placeholder='password'
                        value={password}
                        onChange = {e => dispatch(setPassword(e.target.value))}
                    />
                </Form.Group>
                <Button 
                    variant="primary"
                    type="submit"
                    onClick = {onClick}
                >
                    Login
                </Button>
            </Form>     
    )

    return(
        <div>
            {isLoggedIn? <ChatRoom/> : loginForm}
        </div> 
    )
}

const mapStateToProps = state => ({
    email: state.loginReducer.email,
    password: state.loginReducer.password,
    isLoggedIn: state.loginReducer.isLoggedIn
});

export default connect(mapStateToProps)(Login);