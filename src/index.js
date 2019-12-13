import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer';
// import userReducer from './redux/reducers/userReducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import { insertMessage } from './redux/actions/messageActions';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';


const store = createStore(rootReducer, applyMiddleware(thunk));

const webSocket = new WebSocket('ws://localhost:3003');


webSocket.onmessage = (message) => {
    const parsed = JSON.parse(message.data);
    console.log(parsed);
    if (parsed.channel === 'messages') {
        store.dispatch(insertMessage(JSON.parse(parsed.message)));
    }
};

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
