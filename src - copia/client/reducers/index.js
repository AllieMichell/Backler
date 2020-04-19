import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  login: loginReducer
});

export default rootReducer;
