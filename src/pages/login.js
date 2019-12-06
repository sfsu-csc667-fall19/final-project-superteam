import React from 'react';
import md5 from 'md5';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../App.css';

const options = {
    withCredentials: true
};

const Login = ({ dispatch, isLoggedIn }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    if (isLoggedIn) {
        return <Redirect to='/' />;
    }

    const validate = () => {
        const body = {
            username,
            password: md5(password),
        };
        axios.post('service1/login', body, options)
            .then((res) => {
                if (res.data.valid) {
                    document.cookie = `username=${username}`;
                    document.cookie = `password=${md5(password)}`;
                    dispatch(setIsLogged(true));
                    dispatch(setUser(username));
                }
                else {
                    document.cookie = "username=username";
                    document.cookie = "password=password"
                }
            })
            .catch( console.log
            //     (e) => {
            //     console.log(e);
            // }
            );
    };

    return (
        <div>
            <h1>Login</h1>
            <header className="App-header">
                <div className="form">
                    <h3>Username</h3>
                    <input
                    value={username}
                    onChange={ e => setUsername(e.target.value)}
                    />
                    <br/>
                    <h3>Password</h3>
                    <input
                    type="password"
                    value={password}
                    onChange={ e => setPassword(e.target.value)}
                    />
                    <br />
                    <button
                    onClick={validate}
                    >Login</button>
                </div>
            </header>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Login);