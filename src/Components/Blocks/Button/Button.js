import * as style from './Button.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { combineClassName } from '../../../helpers/classAndIds'

export const Button = ({ version, children, className, ...rest }) => {
  if (version === 'button') {
    return (
      <button {...rest} className={combineClassName(style.button, className)}>
        {children}
      </button>
    )
  }
  if (version === 'link') {
    return (
      <Link {...rest} className={combineClassName(style.button, className)}>
        {children}
      </Link>
    )
  }
  if (version === 'input') {
    return (
      <input
        type="button"
        {...rest}
        className={combineClassName(style.button, className)}
      />
    )
  }
  return null
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  version: PropTypes.string
}
