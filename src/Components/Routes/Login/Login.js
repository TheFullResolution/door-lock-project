import * as style from './Login.scss'

import React from 'react'
import { LoginForm } from './LoginForm/LoginForm'
import PropTypes from 'prop-types'
import { validate } from './methods/validate'
import { submit } from './methods/submit'
import { withFirebase } from 'react-redux-firebase'

const LoginComponent = ({ firebase, ...rest }) => {
  console.log(rest)
  return (
    <div>
      <LoginForm form="login" {...{ validate, firebase }} onSubmit={submit} />
    </div>
  )
}

LoginComponent.propTypes = {
  firebase: PropTypes.object
}

export const Login = withFirebase(LoginComponent)
