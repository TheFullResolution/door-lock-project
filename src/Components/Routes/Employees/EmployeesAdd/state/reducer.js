import update from 'immutability-helper'
import {
  SET_USERS,
  CLEAN_USERS,
  START_LOADING_ADD,
  SET_ERROR
} from './constants'

const initialState = {
  loading: false,
  users: null,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_ADD:
      return update(state, {
        loading: { $set: true },
        error: { $set: null }
      })
    case SET_USERS:
      return update(state, {
        users: { $set: action.payload },
        loading: { $set: false }
      })
    case CLEAN_USERS:
      return update(state, {
        users: { $set: action.payload },
        loading: { $set: false }
      })
    case SET_ERROR:
      return update(state, {
        error: { $set: action.payload },
        loading: { $set: false }
      })
    default:
      return state
  }
}

export default reducer
