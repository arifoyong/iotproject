import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import MyNavbar from './components/Navbar';
import Setting from './components/Setting';
import Dashboard from './components/Dashboard';
import Graph from './components/Graph';
import './App.css';

function App() {
  return (
    <Router>
      <MyNavbar />
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/setting" component={Setting} />
          <Route exact path="/graph/:id" component={Graph} />
        </Switch>
      </div>

    </Router>
  );
}

export default App;
