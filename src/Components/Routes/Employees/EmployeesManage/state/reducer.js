import update from 'immutability-helper'
import {
  START_LOADING_MANAGE,
  SET_ERROR_MANAGE,
  STOP_LOADING_MANAGE
} from './constants'

const initialState = {
  loading: false,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_MANAGE:
      return update(state, {
        loading: { $set: true },
        error: { $set: null }
      })
    case STOP_LOADING_MANAGE:
      return update(state, {
        loading: { $set: false }
      })
    case SET_ERROR_MANAGE:
      return update(state, {
        error: { $set: action.payload },
        loading: { $set: false }
      })
    default:
      return state
  }
}

export default reducer
