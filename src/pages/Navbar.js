import React from 'react';
import '../App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsLoggedIn } from '../redux/actions/loginActions';
import { setIsEditClicked, setIsNoteAdded, setIsEditSubmitted, setPreviousNotes } from '../redux/actions/notesActions';
import { setIsUserCreated } from '../redux/actions/registerActions';

const NavbarLink = ({ dispatch, isLoggedIn, username }) => {

    const logOut = (e) => {
        e.preventDefault()
        //reset all boolean state to initial state
        dispatch(setIsLoggedIn(false)); 
        dispatch(setIsUserCreated(false));
        dispatch(setIsEditClicked(false));
        dispatch(setIsNoteAdded(false));
        dispatch(setIsEditSubmitted(false));
        dispatch(setPreviousNotes(''));
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
            <Navbar.Brand className="nav-brand" to="/">NoteTaking</Navbar.Brand>
            <Nav>
                <NavLink className="nav-link" to="/">Notes</NavLink>
            </Nav>
            {nav}
      </Navbar>
    )
}

const mapStateToProps = state => ({
    isUserCreated: state.registerReducer.isUserCreated,
    username: state.loginReducer.username,
    isLoggedIn: state.loginReducer.isLoggedIn,
    isEditClicked: state.notesReducer.isEditClicked,
    isNoteAdded: state.notesReducer.isEditClicked,
});

export default connect(mapStateToProps)(NavbarLink);