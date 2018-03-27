import {createSelector} from 'reselect'
import {getFirebase} from './getFireBase'

export const getData = createSelector(getFirebase, ({ data }) => data)

