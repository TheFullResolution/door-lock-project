import * as style from './EmployeesDetails.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { checkAccess } from '../../methods/checkAccess'

export const EmployeesDetails = ({ employees, id, doorsAuth, doors }) => {
  const accessDoors =
    doorsAuth &&
    doors &&
    Object.keys(doors)
      .filter(doorId => checkAccess(doorId, doorsAuth, id))
      .map(doorId => doors[doorId].name)
      .join(', ')
  return (
    <div>
      <p>
        {employees[id].name} {employees[id].lastname} {employees[id].email}
      </p>
      <p className={style.access}>
        <span>
          {' '}
          <i className="fa fa-unlock-alt " aria-hidden="true" />Access To:{' '}
        </span>
        {accessDoors}
      </p>
    </div>
  )
}

EmployeesDetails.propTypes = {
  employees: PropTypes.object,
  id: PropTypes.string,
  doorsAuth: PropTypes.object,
  doors: PropTypes.object
}
