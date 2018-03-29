import * as style from './EmployeesManage.scss'

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { EmployeesDetails } from './components/EmployeesDetails/EmployeesDetails'
import Toggle from 'react-toggled'
import { Button } from '../../../Blocks/Button/Button'
import { combineClassName } from '../../../../helpers/classAndIds'
import { connect } from 'react-redux'
import { removeUser } from './state/actions'
import {
  getEmployeesManageError,
  getEmployeesManageLoading
} from './state/getEmployeesManage'
import { EmployeesControls } from './components/EmployeesControls/EmployeesControls'

export const EmployeesManageComponent = ({
  employees,
  id,
  doorsAuth,
  doors,
  loading,
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
            <EmployeesControls
              {...{ employees, id, doorsAuth, doors, loading, removeUser }}
            />
          )}
        </Fragment>
      )}
    </Toggle>
  </li>
)

EmployeesManageComponent.propTypes = {
  doors: PropTypes.object,
  doorsAuth: PropTypes.object,
  employees: PropTypes.object,
  error: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  removeUser: PropTypes.func
}

const mapStateToProps = state => ({
  error: getEmployeesManageError(state),
  loading: getEmployeesManageLoading(state)
})

const mapDispatchToProps = (dispatch, props) => ({
  removeUser: id => {
    dispatch(removeUser(id, props.businessId))
  }
})

export const EmployeesManage = connect(mapStateToProps, mapDispatchToProps)(
  EmployeesManageComponent
)
