import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Btc from './pages/Btc';
import Ltc from './pages/Ltc';
import Eth from './pages/Eth';
import PostDetail from './pages/PostDetail';
import NotFound from './components/404/NotFound.js';
import LayoutApp from './components/layoutApp'


import Login from './pages/Login';
import Signup from './pages/Signup';





// testing routes
// const Profile = () => <h1>profile</h1>


const Router = () => (
  <BrowserRouter>
  <LayoutApp>
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Profile} path='/profile' />
      <Route component={Login} path='/login' />
      <Route component={Signup} path='/signup' />
      <Route component={Btc} path='/btc' />
      <Route component={Ltc} path='/ltc' />
      <Route component={Eth} path='/eth' />
      <Route component={PostDetail} path='/detail/:postId' />
      <Route component={NotFound} />
    </Switch>
    </LayoutApp>
  </BrowserRouter>
);

export default Router;
