import * as style from './Login.scss'

import React from 'react'
import { LoginForm } from './LoginForm/LoginForm'
import PropTypes from 'prop-types'
import { validate } from './methods/validate'
import { submit } from './methods/submit'
import { withFirebase } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Loading } from '../../Blocks/Loading/Loading'
import {
  getAuthUid,
  getIfAuthLoaded
} from '../../../store/firebase/authSelectors'
import {
  getIfProfileAdmin,
  getIfProfileLoaded
} from '../../../store/firebase/profileSelectors'
import { Button } from '../../Blocks/Button/Button'

const LoginComponent = ({
  authExists,
  firebase,
  authLoaded,
  profileLoaded,
  location
}) => {
  const { from } = location.state || {
    from: { pathname: `${process.env.PUBLIC_URL}/` }
  }
  if (authExists) {
    return <Redirect to={from} />
  }

  return (
    <div className={style.container}>
      <h1>Login Page</h1>
      <p>To use this app you have to login first</p>
      <Button
        version={'link'}
        to={`${process.env.PUBLIC_URL}/signup`}
        className={style.link}
      >
        Sign up Instead
      </Button>
      {!authLoaded || !profileLoaded ? (
        <Loading />
      ) : (
        <LoginForm form="login" {...{ validate, firebase }} onSubmit={submit} />
      )}
    </div>
  )
}

LoginComponent.propTypes = {
  authExists: PropTypes.bool,
  authLoaded: PropTypes.bool,
  firebase: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  profileAdmin: PropTypes.bool,
  profileLoaded: PropTypes.bool
}

const mapStateToProps = state => ({
  authExists: !!getAuthUid(state),
  authLoaded: getIfAuthLoaded(state),
  profileAdmin: getIfProfileAdmin(state),
  profileLoaded: getIfProfileLoaded(state)
})

export const Login = withFirebase(connect(mapStateToProps)(LoginComponent))
