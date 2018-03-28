import * as style from './HomeMessage.scss'

import React from 'react'
import PropTypes from 'prop-types'

const renderMessage = access => {
  switch (access) {
    case null:
      return 'state ready'
    case true:
      return 'access granted'
    case false:
      return 'access denied'
    default:
      return null
  }
}
export const HomeMessage = ({ access }) => (
  <p className={style.message}>{renderMessage(access)}</p>
)

HomeMessage.propTypes = {
  access: PropTypes.oneOfType([PropTypes.bool, PropTypes.bool])
}
