import { connect } from 'react-redux'
import {
  getIfAuthorized,
  getIfAuthLoaded
} from '../../../store/firebase/firebaseSelectors'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { Loading } from '../../Blocks/Loading/Loading'

export class PrivateRouteComponent extends Component {
  static propTypes = {
    authExists: PropTypes.bool,
    authLoaded: PropTypes.bool,
    component: PropTypes.func,
    history: PropTypes.object
  }

  static propTypes = {
    authExists: PropTypes.bool,
    authLoaded: PropTypes.bool,
    history: PropTypes.object
  }

  render() {
    const { authLoaded, authExists, component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props =>
          !authLoaded ? (
            <Loading />
          ) : authExists ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )
  }
}

const mapStateToProps = state => ({
  authExists: getIfAuthorized(state),
  authLoaded: getIfAuthLoaded(state)
})

export const PrivateRoute = withRouter(
  connect(mapStateToProps)(PrivateRouteComponent)
)
