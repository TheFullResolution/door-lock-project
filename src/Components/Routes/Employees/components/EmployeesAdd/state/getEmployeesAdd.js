import { createSelector } from 'reselect'

export const getEmployeesAdd = state => state.employeesAdd

export const getEmployeesAddUsers = createSelector(
  getEmployeesAdd,
  employeesAdd => employeesAdd.users
)

export const getEmployeesAddLoading = createSelector(
  getEmployeesAdd,
  employeesAdd => employeesAdd.loading
)
