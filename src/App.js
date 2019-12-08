import React from 'react';
import axios from 'axios';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Messenger from './pages/messenger';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { setUser, setIsLoggedIn } from './redux/actions/userActions'
import './App.css';

function App({ dispatch, isLoggedIn }) {
  React.useEffect(() => {
    axios.get('/service1/verify', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        dispatch(setIsLoggedIn(true));
        dispatch(setUser(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route path="/messenger" component={Messenger} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(App);
