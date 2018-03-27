import { createSelector } from 'reselect'
import { getFirebase } from './getFireBase'

export const getProfile = createSelector(getFirebase, ({ profile }) => profile)

export const getIfProfileLoaded = createSelector(
  getProfile,
  profile => profile.isLoaded
)

export const getIfProfileAdmin = createSelector(
  getProfile,
  profile => profile.roles && profile.roles.admin
)

export const getProfileBusinesses = createSelector(
  getProfile,
  profile => profile.businesses
)

export  const getProfileName = createSelector(getProfile, profile => profile.name)
