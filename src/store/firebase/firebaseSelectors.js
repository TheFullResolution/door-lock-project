import { createSelector } from 'reselect'

export const getFirebase = state => state.firebase

export const getIfAuthLoaded = createSelector(
  getFirebase,
  ({ auth }) => !!auth && auth.isLoaded
)

export const getIfAuthorized = createSelector(
  getFirebase,
  ({ auth }) => !!auth && !!auth.uid
)
