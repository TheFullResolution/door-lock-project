import * as style from './LoginForm.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { InputField } from '../../../Blocks/InputField/InputField'

export const LoginFormComponent = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" type="email" component={InputField} label="Email" />
      <Field
        name="password"
        type="password"
        component={InputField}
        label="Password"
      />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

LoginFormComponent.propTypes = {
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func
}

export const LoginForm = reduxForm({})(LoginFormComponent)
