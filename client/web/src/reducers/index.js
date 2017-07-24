import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import client from '../graphQl/client';
import commentsReducer from './commentsReducer';


const rootReducer = combineReducers({
  routing: routerReducer,
  apollo: client.reducer(),
  commentsStore: commentsReducer
});

export default rootReducer;
