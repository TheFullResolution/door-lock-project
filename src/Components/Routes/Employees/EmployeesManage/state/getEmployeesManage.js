import { createSelector } from 'reselect'

export const getEmployeesManage = state => state.employeesManage

export const getEmployeesManageLoading = createSelector(
  getEmployeesManage,
  employeesAdd => employeesAdd.loading
)

export const getEmployeesManageError = createSelector(
  getEmployeesManage,
  employeesAdd => employeesAdd.error
)
