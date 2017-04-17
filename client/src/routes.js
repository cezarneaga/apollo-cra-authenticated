import React from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={ProtectedRoute(Dashboard)} />
    </Switch>
  </Router>
);
export default Routes;
