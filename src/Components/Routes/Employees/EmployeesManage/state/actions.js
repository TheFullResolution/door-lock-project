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
      firebase
        .remove(`users/${id}/businesses/${businessId}`, true)
        .then(snapshot => {
          return snapshot.val()
        })

    const removeBusiness = () =>
      firebase
        .remove(`businesses/${businessId}/employees/${id}`, true)
        .then(snapshot => {
          return snapshot.val()
        })

    const [user, business] = await Promise.all([
      removeUsers(),
      removeBusiness()
    ])
    console.log(user, business)
    // if (user && business) {

    dispatch({
      type: STOP_LOADING_MANAGE,
      payload: null
    })
    // } else {
    //   throw new Error('Something went wrong, try again later')
    // }
  } catch (e) {
    dispatch({
      type: SET_ERROR_MANAGE,
      payload: e.message
    })
  }
}
