import React from 'react';
import '../App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsLoggedIn } from '../redux/actions/loginActions';
import { setIsUserCreated } from '../redux/actions/registerActions';

const NavbarLink = ({ dispatch, isLoggedIn, username }) => {

    const logOut = (e) => {
        e.preventDefault()
        //reset all boolean state to initial state
        dispatch(setIsLoggedIn(false)); 
        dispatch(setIsUserCreated(false));
    }

    let nav;
    if(isLoggedIn) {
        nav = <Nav>
                <li className="nav-link">Hi, {username}!</li>
                <a href='null' className="nav-link" onClick={logOut}>Logout</a>
            </Nav>
    }else{
        nav = <Nav>
                <NavLink className="nav-link" to="/login">Login</NavLink>
                <NavLink className="nav-link" to="/register">Sign up</NavLink>
              </Nav>
    }

    return(
        <Navbar bg="light justify-content-between" variant="light" sticky="top">
            <Navbar.Brand className="nav-brand" to="/">TrendChat</Navbar.Brand>
            {nav}
      </Navbar>
    )
}

const mapStateToProps = state => ({
    isUserCreated: state.registerReducer.isUserCreated,
    username: state.loginReducer.username,
    isLoggedIn: state.loginReducer.isLoggedIn,
});

export default connect(mapStateToProps)(NavbarLink);