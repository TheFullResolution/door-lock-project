import { createSelector } from 'reselect'
import { getFirebase } from './getFireBase'

export const getProfile = createSelector(getFirebase, ({ profile }) => profile)

export const getIfProfileLoaded = createSelector(
  getProfile,
  profile => profile.isLoaded
)

export const getIfProfileAdmin = createSelector(
  getProfile,
  getIfProfileLoaded,
  profile => profile.roles && profile.roles.admin
)
