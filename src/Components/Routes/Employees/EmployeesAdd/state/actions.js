import {
  SET_USERS,
  CLEAN_USERS,
  SET_ERROR,
  START_LOADING_ADD
} from './constants'
import { getAuthUid } from '../../../../../store/firebase/authSelectors'
import { reset } from 'redux-form'
import { FORM_NAME } from '../EmployeesAdd'

export const searchUsers = email => async (dispatch, getState, getFirebase) => {
  dispatch({ type: START_LOADING_ADD, payload: null })

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
  dispatch({ type: START_LOADING_ADD, payload: null })

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
    const updateUsers = () =>
      firebase
        .uniqueSet(`users/${id}/businesses/${businessId}`, true)
        .then(snapshot => {
          return snapshot.val()
        })

    const updateBusiness = () =>
      firebase
        .uniqueSet(`businesses/${businessId}/employees/${id}`, true)
        .then(snapshot => {
          return snapshot.val()
        })

    const [user, business] = await Promise.all([
      updateUsers(),
      updateBusiness()
    ])

    if (user && business) {
      //reset form since addition was successful
      dispatch(reset(FORM_NAME))

      dispatch({
        type: CLEAN_USERS,
        payload: null
      })
    } else {
      throw new Error('Something went wrong, try again later')
    }
  } catch (e) {
    dispatch({
      type: SET_ERROR,
      payload: e.message
    })
  }
}
