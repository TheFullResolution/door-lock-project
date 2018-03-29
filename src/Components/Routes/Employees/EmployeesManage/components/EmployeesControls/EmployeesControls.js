import * as style from './EmployeesControls.scss'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const EmployeesControls = ({ children, doorsAuth, doors }) => (
  <Fragment>
    <h3>Manage Access</h3>
    <div className={style.wrapper}>
      <ul className={style.doors}>
        {doorsAuth &&
          doors &&
          Object.keys(doors).map(doorId => (
            <li key={doorId}>
              <p className={style.doorsName}>{doors[doorId].name}:</p>
              {children({ doorId })}
            </li>
          ))}
      </ul>
      <div className={style.icon}>
        <i className="fa fa-user-circle-o fa-4x" aria-hidden="true" />
      </div>
    </div>
  </Fragment>
)

EmployeesControls.propTypes = {
  children: PropTypes.func,
  doors: PropTypes.object,
  doorsAuth: PropTypes.object
}
