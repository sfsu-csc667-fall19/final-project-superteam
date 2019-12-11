import React from 'react';
import { connect } from 'react-redux';
import ChatRoom from './ChatRoom';
import { setEmail, setPassword, setUsername, setIsUserCreated, createNewuser} from '../redux/actions/registerActions';
import { setIsLoggedIn } from '../redux/actions/loginActions';
import { Form, Button } from 'react-bootstrap';

const Register = ({ dispatch, isUserCreated, isLoggedIn }) => {
    const onClick = (e) => {
        e.preventDefault()
        if(!isUserCreated) {
            dispatch(createNewuser()).then(res => {
                if(res === true) {
                    dispatch(setIsUserCreated(true));
                    dispatch(setIsLoggedIn(true));
                }else{
                    dispatch(setIsUserCreated(false));
                }
            })
        }
    }

    const registerForm = (
        <Form className='container col-sm-3 mt-5'>
            <Form.Label>Sign Up</Form.Label>
            <Form.Group>
                <Form.Control 
                    type='text'
                    placeholder='user name'
                    onChange = {e => dispatch(setUsername(e.target.value))}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type='text'
                    placeholder='email'
                    onChange = {e => dispatch(setEmail(e.target.value))}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control 
                    type='password' 
                    placeholder='password'
                    onChange = {e => dispatch(setPassword(e.target.value))}
                />
            </Form.Group>
            <Button variant="primary" type="submit"
                onClick = {onClick}
            >
                Submit
            </Button>
        </Form>
    )

    return (
        <div>
            {isLoggedIn? <ChatRoom/> : registerForm}
        </div>
    )
}

const mapStateToProps = state => ({
    username: state.registerReducer.username,
    email: state.registerReducer.email,
    password: state.registerReducer.password,
    isUserCreated: state.registerReducer.isUserCreated,
    isLoggedIn: state.loginReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Register);