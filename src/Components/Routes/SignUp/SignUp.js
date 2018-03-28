import * as style from './SignUp.scss'

import React from 'react'
import { SignUpForm } from './SignUpForm/SignUpForm'
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

const SignUpComponent = ({
  authExists,
  firebase,
  authLoaded,
  profileLoaded,
  location
}) => {
  const { from } = location.state || { from: { pathname: '/' } }
  if (authExists) {
    return <Redirect to={from} />
  }

  return (
    <div className={style.container}>
      <h1>Sign Up Page</h1>
      <p>Create account so you manager can add you to the employee list</p>
      <Button version={'link'} to={'/login'} className={style.link}>
        Login Instead
      </Button>
      {!authLoaded || !profileLoaded ? (
        <Loading />
      ) : (
        <SignUpForm
          form="signup"
          {...{ validate, firebase }}
          onSubmit={submit}
        />
      )}
    </div>
  )
}

SignUpComponent.propTypes = {
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

export const SignUp = withFirebase(connect(mapStateToProps)(SignUpComponent))
