import { combineReducers } from 'redux';
import userReducer from './userReducer';
import messagesReducer from './messagesReducer';

export default combineReducers({
    userReducer,
    messagesReducer,
});