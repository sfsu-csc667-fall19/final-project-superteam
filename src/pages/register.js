import React from 'react';
import md5 from 'md5';
import axios from 'axios';
import '../App.css';

const Login = () => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const validate = () => {
        if (firstName === '' ||
            lastName === '' ||
            email === '' ||
            username === '' ||
            password === '') {
            return setError('You forgot to enter some information!');
        }
        const body = {
            firstName,
            lastName,
            email,
            username,
            password: md5(password),
        };
        axios.post('/users/register', body)
            .then((res) => {
                console.log(res);
                window.location = '/login';
            })
            .catch(console.log);
    };

    return (
        <div className="login">
            <div className="form">
                <h1>Messenger</h1>
                <input
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <br />
                <input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <br />
                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <br />
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
                <button onClick={validate}>Register</button>
                <p className="error">{error}</p>
            </div>
        </div>
    );
};

export default Login;