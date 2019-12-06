import React from 'react';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import axios from 'axios';
import { connect } from 'react-redux';
import { Switch, Route, Link } from "react-router-dom";
import { setUser, setIsLoggedIn } from './redux/actions/userActions'
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
          
//         </a>
//       </header>
//     </div>
//   );
// }

const options = {
  withCredentials: true
};

const App = ({ dispatch, isLoggedIn }) => {
  React.useEffect(() => {
    axios.get('/service1/verify', options)
      .then((res) => {
        console.log(res);
        dispatch(setIsLoggedIn(true));
        dispatch(setUser(res.data.username));
      })
      .catch((e) => {
        console.log(e);
      });
  }, [dispatch]);
  
  return (
    <div className="App"> 
      <nav>
        <Link to="/">Home</Link>
        {!isLoggedIn && (
          <Link to="/login">Login</Link>
        )}
        {!isLoggedIn && (
          <Link to="/register">Register</Link>
        )}  
      </nav>
      <Switch>
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
