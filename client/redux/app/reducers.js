import { combineReducers } from 'redux';

import phoneLoginSlice from '../features/auth/phoneLoginSlice';
import userRegister from '../features/auth/userRegisterSlice';

const rootReducer = combineReducers({
  phonelogin: phoneLoginSlice,
  authRegister: userRegister,
});

export default rootReducer;
