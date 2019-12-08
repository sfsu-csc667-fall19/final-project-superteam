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
        axios.post('/service1/login', body, { withCredentials: true })
            .then((res) => {
                if (res.data) {
                    document.cookie = `username=${username}`;
                    document.cookie = `password=${md5(password)}`;

                    window.location = '/messenger';
                } else {
                    document.cookie = 'username=username';
                    document.cookie = 'password=password';
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