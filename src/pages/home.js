import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {

    return (
        <div className="login">
            <div>
                <h1>Messenger</h1>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default Home;