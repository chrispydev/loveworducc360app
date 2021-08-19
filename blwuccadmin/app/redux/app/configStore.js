import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
// import userCacheSlice from '../features/auth/userCacheSlice';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default configureStore({
//   reducer: {
//     authentication: userCacheSlice,
//     // rootReducer,
//   },
//   middleware: getDefaultMiddleware({
//     serializableCheck: false,
//   }),
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
