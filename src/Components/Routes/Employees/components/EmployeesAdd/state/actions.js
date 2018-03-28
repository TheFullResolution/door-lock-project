import { SET_USERS, CLEAN_USERS, SET_ERROR, START_LOADING } from './constants'
import { getAuthUid } from '../../../../../../store/firebase/authSelectors'

export const searchUsers = email => async (dispatch, getState, getFirebase) => {
  dispatch({ type: START_LOADING, payload: null })

  const firebase = getFirebase()

  const users = await firebase
    .ref('users')
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snapshot => {
      return snapshot.val()
    })

  dispatch({ type: SET_USERS, payload: users })
}

export const addUser = (id, businessId) => async (
  dispatch,
  getState,
  getFirebase
) => {
  dispatch({ type: START_LOADING, payload: null })

  const uid = getAuthUid(getState())

  if (uid === id) {
    dispatch({
      type: SET_ERROR,
      payload: 'You can not add yourself, admin has access to all doors'
    })
    return
  }

  const firebase = getFirebase()

  try {
    const users = await firebase
      .uniqueSet(`users/${id}/businesses/${businessId}`, true)
      .then(snapshot => {
        return snapshot.val()
      })

    const business = await firebase
      .uniqueSet(`businesses/${businessId}/employees/${id}`, true)
      .then(snapshot => {
        return snapshot.val()
      })

    dispatch({
      type: CLEAN_USERS,
      payload: null
    })
  } catch (e) {
    console.log(e)

    dispatch({
      type: SET_ERROR,
      payload: e.message
    })
  }
}
