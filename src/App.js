import React from 'react';
import axios from 'axios';
import Login  from './pages/Login';
import Register  from './pages/Register';
import Landing from './pages/Landing';
import Navbar from './pages/Navbar';
import { Route, HashRouter, Switch } from "react-router-dom";

import './App.css';

function App() {
  return (
      <HashRouter>
        <Navbar/>
        <Switch>
            <Route exact path='/' component={Landing}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
        </Switch>
      </HashRouter>
  );
}

export default App;
