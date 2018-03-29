import * as style from './EmployeesManage.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { EmployeesDetails } from './components/EmployeesDetails/EmployeesDetails'
import Toggle from 'react-toggled'
import { Button } from '../../../Blocks/Button/Button'
import { combineClassName } from '../../../../helpers/classAndIds'

export const EmployeesManage = ({ employees, id, doorsAuth, doors }) => (
  <li className={style.employee}>
    <Toggle>
      {({ on, getTogglerProps }) => (
        <div className={style.wrapper}>
          <EmployeesDetails {...{ employees, id, doorsAuth, doors }} />
          <Button
            version="button"
            className={style.button}
            {...getTogglerProps()}
          >
            {on ? 'Hide' : 'Edit'}
            <i
              className={combineClassName(
                'fa fa-lg',
                on ? 'fa-angle-up' : 'fa-angle-down'
              )}
              aria-hidden="true"
            />
          </Button>
        </div>
      )}
    </Toggle>
  </li>
)

EmployeesManage.propTypes = {
  employees: PropTypes.object,
  id: PropTypes.string,
  doorsAuth: PropTypes.object,
  doors: PropTypes.object
}
