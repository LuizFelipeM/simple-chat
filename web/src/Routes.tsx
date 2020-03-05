import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const Routes = () => {

  return (
      <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/" component={Dashboard} exact />
        </Switch>
      </BrowserRouter>
  );
}

export default Routes;