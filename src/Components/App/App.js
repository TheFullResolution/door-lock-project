import * as style from './App.scss'

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Login } from '../Routes/Login/Login'
import { Dashboard } from '../Routes/Dashboard/Dashboard'
import { NotFound } from '../Routes/NotFound/NotFound'
import { Restricted } from '../Routes/Restricted/Restricted'
import { Home } from '../Routes/Home/Home'
import { PrivateRoute } from '../Blocks/PrivateRoute/PrivateRoute'

export const App = () => (
  <div className={style.container}>
    <h1>YOLO</h1>

    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/restricted" component={Restricted} />

      <PrivateRoute path="/" component={Home} exact={true} />
      <PrivateRoute path="/dashboard" component={Dashboard} adminOnly={true} />

      <Route component={NotFound} />
    </Switch>
  </div>
)
