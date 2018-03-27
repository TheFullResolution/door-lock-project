import { createSelector } from 'reselect'
import { getFirebase } from './getFireBase'
import { getProfileBusinesses } from './profileSelectors'

export const getData = createSelector(getFirebase, ({ data }) => data)

export const getBusinesses = createSelector(
  getData,
  ({ businesses }) => businesses
)

export const getUsers = createSelector(getData, ({ users }) => users)

export const getUsersBusinesses = createSelector(
  getBusinesses,
  getProfileBusinesses,
  (businesses, userBusinesses) =>
    userBusinesses && businesses
      ? userBusinesses.map(id => ({ ...businesses[id], id }))
      : []
)
