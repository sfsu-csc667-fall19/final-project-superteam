import React from 'react';
import md5 from 'md5';
import axios from 'axios';
import '../App.css';

const options = {
    withCredentials: true
};

const Register = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const validate = () => {
        const body = {
            username,
            password: md5(password),
        };
        axios.post('/service1/register', body, options)
            .then((res) => {
                console.log(res);
            })
            .catch(console.log);
    };

    return (
        <div>
            <h1>Register</h1>
            <header className="App-header">
                <div className="form">
                    <h3>Username</h3>
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <br />
                    <h3>Password</h3>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <br />
                    <button
                        onClick={validate}
                    >Submit</button>

                </div>
            </header>
        </div>
    );
};

export default Register;