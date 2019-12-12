import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import topicReducer from './topicReducer';

export default combineReducers({
  loginReducer,
  registerReducer,
  topicReducer,
});
