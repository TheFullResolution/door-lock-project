import * as style from './EmployeesDetails.scss'

import React from 'react'
import PropTypes from 'prop-types'

const checkAccess = (doorID, doorsAuth, userId) => doorsAuth[doorID][userId]

export const EmployeesDetails = ({ employees, id, doorsAuth, doors }) => (
  <div>
    <p>
      {employees[id].name} {employees[id].lastname} {employees[id].email}
    </p>
    <p className={style.access}>
      <span>
        {' '}
        <i className="fa fa-unlock-alt " aria-hidden="true" />Access To:{' '}
      </span>
      {doorsAuth &&
        doors &&
        Object.keys(doors).map(
          doorId =>
            checkAccess(doorId, doorsAuth, id) ? ` ${doors[doorId].name}` : ''
        )}
    </p>
  </div>
)

EmployeesDetails.propTypes = {
  employees: PropTypes.object,
  id: PropTypes.string,
  doorsAuth: PropTypes.object,
  doors: PropTypes.object
}
