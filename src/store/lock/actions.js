import {
  START_OPENING,
  OPEN_ALLOWED,
  OPEN_NOT_AUTH,
  ADD_LOCK,
  RESET_LOCK
} from './constants'
import { getAuthUid } from '../firebase/authSelectors'

const simulateRealLifeLock = (dispatch, key) => {
  setTimeout(() => {
    dispatch({ type: RESET_LOCK, payload: key })
  }, 5000)
}

export const openLock = ({ key, shop }) => async (
  dispatch,
  getState,
  getFirebase
) => {
  dispatch({ type: START_OPENING, payload: key })
  const firebase = getFirebase()
  let validate

  try {
    validate = await firebase
      .ref(`doors/${shop}/${key}`)
      .once('value')
      .then(snapshot => {
        return snapshot.val()
      })

    dispatch({ type: OPEN_ALLOWED, payload: key })

    simulateRealLifeLock(dispatch, key)
  } catch (e) {
    dispatch({ type: OPEN_NOT_AUTH, payload: key })

    simulateRealLifeLock(dispatch, key)
  } finally {
    const uid = getAuthUid(getState())
    const obj = {
      door: key,
      event: validate ? 'opened' : 'denied',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: uid
    }
    firebase.push(`logs/${shop}`, obj)
  }
}

export const addLock = key => dispatch => {
  dispatch({ type: ADD_LOCK, payload: key })
}

export const resetLock = key => dispatch => {
  dispatch({ type: RESET_LOCK, payload: key })
}
