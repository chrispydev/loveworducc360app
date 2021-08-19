import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import currentUserSlice from '../features/auth/phoneLoginSlice';
import userRegister from '../features/auth/userRegisterSlice';
import rootReducer from './reducers';
import routeSlice from '../features/routes/routeSlice';

// const persistConfig = {
/// key: 'root',//
//   storage: AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
    authregister: userRegister,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware({
//     serializableCheck: false,
//   }),
// });

export const persistor = persistStore(store);
