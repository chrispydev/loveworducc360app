import React from 'react';
import { Home } from './Home';
import { SignUp } from './SignUp';
import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={SignUp} />
      </Switch>
    </>
  );
}
