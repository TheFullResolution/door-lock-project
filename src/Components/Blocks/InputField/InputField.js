import * as style from './InputField.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { formatId } from '../../../helpers/classAndIds'
import { combineClassName } from '../../../helpers/classAndIds'

export const InputField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => {
  const id = formatId(label)
  return (
    <div className={style.container}>
      <div className={style.labels}>
        <label htmlFor={id}>{label}</label>
        {touched && (error && <span className={style.error}>{error}</span>)}
      </div>

      <input
        {...input}
        className={combineClassName(
          style.input,
          touched && error && style.inputError
        )}
        placeholder={label}
        type={type}
        id={id}
      />
    </div>
  )
}

InputField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  type: PropTypes.string
}
