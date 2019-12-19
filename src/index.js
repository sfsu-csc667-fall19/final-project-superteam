import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import { insertMessage } from './redux/actions/messageActions';
import { insertGroup } from './redux/actions/groupActions';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';


const store = createStore(rootReducer, applyMiddleware(thunk));

// const webSocket = new WebSocket('ws://localhost:3003');
// const webSocket = new WebSocket('ws://172.28.0.1:3003');
// const webSocket = new WebSocket('ws://' + window.location.host.split(':')[0] + (window.location.port && `:${window.location.port}`) + '/websocket');
const webSocket = new WebSocket('ws://' + window.location.host.split(':')[0] + (window.location.port && `:${window.location.port}`) + '/websocket/');

webSocket.onmessage = (message) => {
    const parsed = JSON.parse(message.data);
    if (parsed.channel === 'messages') {
        store.dispatch(insertMessage(JSON.parse(parsed.message)));
    }
    if (parsed.channel === 'groups') {
        store.dispatch(insertGroup(JSON.parse(parsed.message)));
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
