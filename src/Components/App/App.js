import * as style from './App.scss'

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Login } from '../Routes/Login/Login'
import { Dashboard } from '../Routes/Dashboard/Dashboard'
import { NotFound } from '../Routes/NotFound/NotFound'
import { PrivateRoute } from './PrivateRoute/PrivateRoute'

export const App = () => (
  <div className={style.container}>
    <h1>YOLO</h1>

    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </div>
)
