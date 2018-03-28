import * as style from './EmployeesAdd.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { EmployeesAddForm } from './components/EmployeesAddForm/EmployeesAddForm'
import { validate } from './methods/validate'
import { submit } from './methods/submit'
import { connect } from 'react-redux'
import {
  getEmployeesAddError,
  getEmployeesAddLoading,
  getEmployeesAddUsers
} from './state/getEmployeesAdd'
import { EmployeesAddResults } from './components/EmployeesAddResults/EmployeesAddResults'
import { addUser } from './state/actions'

export const EmployeesAddComponent = ({ error, loading, users, addUser }) => (
  <div className={style.container}>
    <EmployeesAddForm form="employeadd" {...{ validate }} onSubmit={submit} />
    <EmployeesAddResults {...{ addUser, error, loading, users }} />
  </div>
)

EmployeesAddComponent.propTypes = {
  addUser: PropTypes.func,
  businessId: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
  users: PropTypes.object
}

const mapStateToProps = state => ({
  error: getEmployeesAddError(state),
  loading: getEmployeesAddLoading(state),
  users: getEmployeesAddUsers(state)
})

const mapDispatchToProps = (dispatch, props) => ({
  addUser: id => {
    dispatch(addUser(id, props.businessId))
  }
})

export const EmployeesAdd = connect(mapStateToProps, mapDispatchToProps)(
  EmployeesAddComponent
)
