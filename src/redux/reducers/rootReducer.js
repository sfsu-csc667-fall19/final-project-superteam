import { combineReducers } from 'redux';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import groupReducer from './groupReducer';

export default combineReducers({
    userReducer,
    messageReducer,
    groupReducer,
});