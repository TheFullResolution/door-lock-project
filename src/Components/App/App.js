import * as style from './App.scss'

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Login } from '../Routes/Login/Login'
import { Dashboard } from '../Routes/Dashboard/Dashboard'
import { NotFound } from '../Routes/NotFound/NotFound'
import { Restricted } from '../Routes/Restricted/Restricted'
import { Home } from '../Routes/Home/Home'
import { PrivateRoute } from '../Blocks/PrivateRoute/PrivateRoute'
import { Header } from '../Blocks/Header/Header'
import { Logs } from '../Routes/Logs/Logs'
import { Employees } from '../Routes/Employees/Employees'
import { SignUp } from '../Routes/SignUp/SignUp'

export const App = props => (
  <div className={style.container}>
    <Header />

    <Switch>
      <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
      <Route path={`${process.env.PUBLIC_URL}/signup`} component={SignUp} />
      <Route
        path={`${process.env.PUBLIC_URL}/restricted`}
        component={Restricted}
      />

      <PrivateRoute
        path={`${process.env.PUBLIC_URL}/`}
        component={Home}
        exact={true}
      />
      <PrivateRoute
        path={`${process.env.PUBLIC_URL}/dashboard`}
        component={Dashboard}
        adminOnly={true}
      />
      <PrivateRoute
        path={`${process.env.PUBLIC_URL}/logs/:id`}
        component={Logs}
        adminOnly={true}
      />
      <PrivateRoute
        path={`${process.env.PUBLIC_URL}/employees/:id`}
        component={Employees}
        adminOnly={true}
      />

      <Route component={NotFound} />
    </Switch>
  </div>
)
