import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/redux/app/configStore';

// import store from './app/redux/app/configStore';
import AppWrapper from './AppWrapper';

export default function App() {
  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <AppWrapper />
        </Provider>
      </PersistGate>
    </>
  );
}
