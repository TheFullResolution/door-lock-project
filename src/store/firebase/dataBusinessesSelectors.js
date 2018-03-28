import { getData } from './dataSelectors'
import { getProfileBusinesses } from './profileSelectors'
import { createSelector } from 'reselect'

export const getBusinesses = createSelector(
  getData,
  ({ businesses }) => businesses
)
export const getUsersBusinesses = createSelector(
  getBusinesses,
  getProfileBusinesses,
  (businesses, userBusinesses) =>
    userBusinesses && businesses
      ? Object.keys(userBusinesses).map(id => ({ ...businesses[id], id }))
      : []
)

export const makeGetBusinessByID = id =>
  createSelector(
    getBusinesses,
    businesses => businesses[id] && { ...businesses[id], id }
  )
