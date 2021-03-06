import { createSelector } from 'reselect'
import { getFirebase } from './getFireBase'

export const getAuth = createSelector(getFirebase, ({ auth }) => auth)

export const getIfAuthLoaded = createSelector(getAuth, auth => auth.isLoaded)

export const getAuthUid = createSelector(getAuth, auth => auth.uid)
