import * as style from './HomeMessage.scss'

import React from 'react'
import PropTypes from 'prop-types'

export const HomeMessage = ({ access }) => <p>{String(access)}</p>

HomeMessage.propTypes = {
  access: PropTypes.oneOfType([PropTypes.bool, PropTypes.bool])
}
