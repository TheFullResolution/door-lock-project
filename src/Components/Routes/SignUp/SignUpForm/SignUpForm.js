import * as style from './SignUpForm.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { InputField } from '../../../Blocks/InputField/InputField'
import { Button } from '../../../Blocks/Button/Button'

export const LoginFormComponent = props => {
  const { handleSubmit, pristine, reset, submitting, error } = props
  return (
    <form onSubmit={handleSubmit} className={style.form} autoComplete="on">
      <Field
        name="email"
        type="email"
        component={InputField}
        label="Email"
        autocomplete="email"
      />
      <Field
        name="password"
        type="password"
        component={InputField}
        label="Password"
      />
      <Field
        name="name"
        type="text"
        component={InputField}
        label="Name"
        autocomplete="given-name"
      />
      <Field
        name="lastname"
        type="text"
        component={InputField}
        label="Last Name"
        autocomplete="family-name"
      />
      {error && (
        <div className={style.message}>
          <i className="fa fa-exclamation-triangle fa-2x" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}
      <div className={style.navigation}>
        <Button
          version="button"
          type="submit"
          className={style.submit}
          disabled={submitting}
        >
          Submit
        </Button>
        <Button
          version="button"
          type="button"
          className={style.clear}
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Values
        </Button>
      </div>
    </form>
  )
}

LoginFormComponent.propTypes = {
  error: PropTypes.string,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func
}

export const SignUpForm = reduxForm({})(LoginFormComponent)
