import * as style from './InputField.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { formatId } from '../../../helpers/classAndIds'

export const InputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => {
  const id = formatId(label)
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} id={id} />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
}

InputField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  type: PropTypes.string
}
