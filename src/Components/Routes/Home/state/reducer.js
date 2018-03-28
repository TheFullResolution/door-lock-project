import {
  START_OPENING,
  OPEN_ALLOWED,
  OPEN_NOT_AUTH,
  ADD_LOCK,
  RESET_LOCK
} from './constants'
import update from 'immutability-helper'

const initialKeyObject = {
  loading: false,
  access: null
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LOCK:
      return update(state, {
        $merge: {
          [action.payload]: initialKeyObject
        }
      })

    case RESET_LOCK:
      return update(state, {
        [action.payload]: {
          access: { $set: null }
        }
      })

    case START_OPENING:
      return update(state, {
        [action.payload]: {
          loading: { $set: true }
        }
      })

    case OPEN_ALLOWED:
      return update(state, {
        [action.payload]: {
          access: { $set: true },
          loading: { $set: false }
        }
      })

    case OPEN_NOT_AUTH:
      return update(state, {
        [action.payload]: {
          access: { $set: false },
          loading: { $set: false }
        }
      })
    default:
      return state
  }
}

export default reducer
