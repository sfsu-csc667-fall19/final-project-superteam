import React from 'react';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Messenger from './pages/messenger';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {  
  return (
    <div className="App">
      <Switch>
        <Route path="/messenger" component={Messenger} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </Router>
    </div>
  );
}

export default App;
