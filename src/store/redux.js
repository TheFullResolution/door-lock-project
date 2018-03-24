import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  reactReduxFirebase,
  getFirebase,
  firebaseReducer
} from 'react-redux-firebase'
import { reducer as formReducer } from 'redux-form'
import firebase from 'firebase'

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyCIs_8n_ROn-WxF4ptSzAz14fI_q0Ls-yY',
  authDomain: 'door-lock-project.firebaseapp.com',
  databaseURL: 'https://door-lock-project.firebaseio.com',
  projectId: 'door-lock-project'
}
// react-redux-firebase options
const config = {
  userProfile: 'users',
  enableLogging: false
}

firebase.initializeApp(firebaseConfig)

const rootReducer = combineReducers({
  form: formReducer,
  firebase: firebaseReducer
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(getFirebase)),
    reactReduxFirebase(firebase, config)
  )
)
