import * as style from './EmployeesManage.scss'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { EmployeesDetails } from './components/EmployeesDetails/EmployeesDetails'
import Toggle from 'react-toggled'
import { Button } from '../../../Blocks/Button/Button'
import { combineClassName } from '../../../../helpers/classAndIds'
import { connect } from 'react-redux'
import { addAccess, removeAccess, removeUser } from './state/actions'
import {
  getEmployeesManageError,
  getEmployeesManageLoading
} from './state/getEmployeesManage'
import { EmployeesControls } from './components/EmployeesControls/EmployeesControls'
import { EmployeeAccessToggle } from './components/EmployeeAccessToggle/EmployeeAccessToggle'
import { EmployeesRemove } from './components/EmployeesRemove/EmployeesRemove'
import { checkAccess } from './methods/checkAccess'

export const EmployeesManageComponent = ({
  addAccess,
  doors,
  doorsAuth,
  employees,
  id,
  loading,
  removeAccess,
  removeUser
}) => (
  <li className={style.employee}>
    <Toggle>
      {({ on, getTogglerProps }) => (
        <Fragment>
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
          {on && (
            <div className={style.controlsContainer}>
              <div className={style.controlsWrapper}>
                <EmployeesControls {...{ doors, doorsAuth }}>
                  {({ doorId }) => (
                    <EmployeeAccessToggle
                      {...{ doorId, id, addAccess, loading, removeAccess }}
                      access={checkAccess(doorId, doorsAuth, id)}
                    />
                  )}
                </EmployeesControls>
                <EmployeesRemove {...{ id, removeUser, loading }} />
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Toggle>
  </li>
)

EmployeesManageComponent.propTypes = {
  addAccess: PropTypes.func,
  doors: PropTypes.object,
  doorsAuth: PropTypes.object,
  employees: PropTypes.object,
  error: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  removeAccess: PropTypes.func,
  removeUser: PropTypes.func
}

const mapStateToProps = state => ({
  error: getEmployeesManageError(state),
  loading: getEmployeesManageLoading(state)
})

const mapDispatchToProps = (dispatch, props) => ({
  addAccess: (id, doorId) => {
    dispatch(addAccess({ id, doorId, businessId: props.businessId }))
  },
  removeAccess: (id, doorId) => {
    dispatch(removeAccess({ id, doorId, businessId: props.businessId }))
  },
  removeUser: id => {
    dispatch(removeUser({ id, businessId: props.businessId }))
  }
})

export const EmployeesManage = connect(mapStateToProps, mapDispatchToProps)(
  EmployeesManageComponent
)
