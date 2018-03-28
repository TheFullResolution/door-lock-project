import * as style from './EmployeesAdd.scss'

import React from 'react'
import PropTypes from 'prop-types'
import { EmployeesAddForm } from '../EmployeesAddForm/EmployeesAddForm'
import { validate } from './methods/validate'
import { submit } from './methods/submit'
import { connect } from 'react-redux'
import {
  getEmployeesAddLoading,
  getEmployeesAddUsers
} from './state/getEmployeesAdd'
import { EmployeesAddResults } from '../EmployeesAddResults/EmployeesAddResults'
import { addUser } from './state/actions'

export const EmployeesAddComponent = ({ loading, users, addUser }) => (
  <div className={style.container}>
    <EmployeesAddForm form="employeadd" {...{ validate }} onSubmit={submit} />
    <EmployeesAddResults {...{ addUser, loading, users }} />
  </div>
)

EmployeesAddComponent.propTypes = {
  addUser: PropTypes.func,
  businessId: PropTypes.string,
  loading: PropTypes.bool,
  users: PropTypes.object
}

const mapStateToProps = state => ({
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
