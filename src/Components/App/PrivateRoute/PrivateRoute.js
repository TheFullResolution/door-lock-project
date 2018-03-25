import { connect } from 'react-redux'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { Loading } from '../../Blocks/Loading/Loading'
import {
  getIfAuthorized,
  getIfAuthLoaded
} from '../../../store/firebase/authSelectors'
import {
  getIfProfileAdmin,
  getIfProfileLoaded
} from '../../../store/firebase/profileSelectors'

export class PrivateRouteComponent extends Component {
  static propTypes = {
    adminOnly: PropTypes.bool.isRequired,
    authExists: PropTypes.bool,
    authLoaded: PropTypes.bool,
    component: PropTypes.func,
    history: PropTypes.object,
    profileAdmin: PropTypes.bool,
    profileLoaded: PropTypes.bool
  }

  static propTypes = {
    authExists: PropTypes.bool,
    authLoaded: PropTypes.bool,
    history: PropTypes.object
  }

  render() {
    const {
      adminOnly,
      authLoaded,
      authExists,
      profileAdmin,
      profileLoaded,
      component: Component,
      ...rest
    } = this.props
    console.log()
    return (
      <Route
        {...rest}
        render={props => {
          //if the profile or auth object not loaded - wait
          if (!authLoaded || !profileLoaded) {
            return <Loading />
          }

          //if logged in and page not restricted to admins,
          //or page restricted to admin, but a user is an admin
          if (authExists && (!adminOnly || profileAdmin)) {
            return <Component {...props} />
          }

          //if page restricted to admin, and a user is not an admin
          if (authExists && !profileAdmin) {
            return (
              <Redirect
                to={{
                  pathname: '/restricted'
                }}
              />
            )
          }

          //if all other coditions not met, go to login page
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  authExists: getIfAuthorized(state),
  authLoaded: getIfAuthLoaded(state),
  profileAdmin: getIfProfileAdmin(state),
  profileLoaded: getIfProfileLoaded(state)
})

export const PrivateRoute = withRouter(
  connect(mapStateToProps)(PrivateRouteComponent)
)
