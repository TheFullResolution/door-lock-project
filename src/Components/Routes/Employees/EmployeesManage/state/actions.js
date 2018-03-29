import {
  START_LOADING_MANAGE,
  SET_ERROR_MANAGE,
  STOP_LOADING_MANAGE
} from './constants'
import { getAuthUid } from '../../../../../store/firebase/authSelectors'

export const removeUser = (id, businessId) => async (
  dispatch,
  getState,
  getFirebase
) => {
  dispatch({ type: START_LOADING_MANAGE, payload: null })

  const uid = getAuthUid(getState())

  if (uid === id) {
    dispatch({
      type: SET_ERROR_MANAGE,
      payload: 'You can not remove yourself'
    })
    return
  }

  const firebase = getFirebase()

  try {
    const removeUsers = () =>
      firebase.remove(`users/${id}/businesses/${businessId}`)

    const removeBusiness = () =>
      firebase.remove(`businesses/${businessId}/employees/${id}`)

    await Promise.all([removeUsers(), removeBusiness()])

    dispatch({
      type: STOP_LOADING_MANAGE,
      payload: null
    })
  } catch (e) {
    dispatch({
      type: SET_ERROR_MANAGE,
      payload: e.message
    })
  }
}
