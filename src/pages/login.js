import React from 'react';
import md5 from 'md5';
import axios from 'axios';
import '../App.css';

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const validate = () => {
        const body = {
            username,
            password: md5(password),
        };
        axios.post('/users/login', body, { withCredentials: true })
            .then((res) => {
                if (res.data) {
                    document.cookie = `id=${res.data._id}`;
                    document.cookie = `username=${res.data.username}`;
                    document.cookie = `password=${res.data.password}`;
                    document.cookie = `firstName=${res.data.firstName}`;
                    document.cookie = `lastName=${res.data.lastName}`;

                    window.location = '/messenger';
                } else {
                    document.cookie = 'id=id';
                    document.cookie = 'username=username';
                    document.cookie = 'password=password';
                    document.cookie = 'firstName=firstName';
                    document.cookie = 'lastName=lastName';
                    setError('Username or password incorrect!')
                }
            })
            .catch(console.log);
    };

    return (
        <div className="login">
            <div className="form">
                <h1>Messenger</h1>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <br />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <br />
                <button onClick={validate}>Login</button>
                <p className="error">{error}</p>
            </div>
        </div>
    );
};

export default Login;