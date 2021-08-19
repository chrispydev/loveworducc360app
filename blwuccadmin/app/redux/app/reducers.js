import { combineReducers } from 'redux';
import userCacheSlice from '../features/auth/userCacheSlice';

const rootReducer = combineReducers({
  authentication: userCacheSlice,
});

export default rootReducer;
