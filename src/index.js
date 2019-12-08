import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { updateMessages } from './redux/actions/messagesActions';

const store = createStore(rootReducer, applyMiddleware(thunk));

const ws = new WebSocket('ws://localhost:4000');

ws.onclose = () => {
    console.log('connection has closed!');
};

ws.onopen = () => {
    console.log('connection has opened!');
};

ws.onmessage = (message) => {
    const messageObject = JSON.parse(message.data);
    console.log(messageObject);
    // eslint-disable-next-line
    switch (messageObject.type) {
        case 'UPDATE_MESSAGES':
            store.dispatch(updateMessages(messageObject.messages));
            break;
    }
};

ws.onerror = (e) => {
    console.log(e);
};

window.ws = ws;

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
