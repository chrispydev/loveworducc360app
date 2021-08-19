import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { DownloadPage } from './DownloadPage';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={DownloadPage} />
      </Switch>
    </>
  );
}
