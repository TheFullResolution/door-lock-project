import * as style from './EmployeesControls.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { checkAccess } from '../../methods/checkAccess'
import { EmployeesRemove } from '../EmployeesRemove/EmployeesRemove'
// import Toggle from 'react-toggled'
// import { Button } from '../../../../../Blocks/Button/Button'

export const EmployeesControls = ({
  employees,
  id,
  doorsAuth,
  doors,
  removeUser,
  loading
}) => (
  <div className={style.container}>
    <div className={style.wrapper}>
      <h3>Manage Access</h3>
      <ul className={style.doors}>
        {doorsAuth &&
          doors &&
          Object.keys(doors).map(doorId => (
            <li key={doorId}>
              <p className={style.doorsName}>{doors[doorId].name}:</p>
            </li>
          ))}
      </ul>
      <EmployeesRemove {...{ id, removeUser, loading }} />
    </div>
  </div>
)

EmployeesControls.propTypes = {
  doors: PropTypes.object,
  doorsAuth: PropTypes.object,
  employees: PropTypes.object,
  error: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  removeUser: PropTypes.func
}
