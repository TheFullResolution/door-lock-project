import * as style from './EmployeesAddForm.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button } from '../../../../Blocks/Button/Button'
import { InputField } from '../../../../Blocks/InputField/InputField'

export const EmployeesAddFormComponent = props => {
  const { handleSubmit, submitting, error } = props
  return (
    <form onSubmit={handleSubmit} className={style.form} autoComplete="on">
      <h3>Search By Email</h3>
      <Field
        name="email"
        type="email"
        component={InputField}
        label="Email"
        autocomplete="email"
      />
      <div className={style.wrapper}>
        <Button
          version="button"
          type="submit"
          className={style.submit}
          disabled={submitting}
        >
          Search
        </Button>
      </div>
      {error && (
        <div className={style.message}>
          <i className="fa fa-exclamation-triangle fa-2x" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}
    </form>
  )
}

EmployeesAddFormComponent.propTypes = {
  error: PropTypes.string,
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func
}

export const EmployeesAddForm = reduxForm({})(EmployeesAddFormComponent)
