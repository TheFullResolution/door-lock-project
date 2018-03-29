import * as style from './Loading.scss'

import React from 'react'
import { combineClassName } from '../../../helpers/classAndIds'
import PropTypes from 'prop-types'

export const LoadingIcon = ({ size }) => (
  <i
    className={combineClassName('fa fa-cog fa-spin fa-fw', style.loader, size)}
    aria-hidden="true"
  />
)

LoadingIcon.propTypes = {
  size: PropTypes.string
}
