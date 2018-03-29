import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  reactReduxFirebase,
  getFirebase,
  firebaseReducer
} from 'react-redux-firebase'
import lockReducer from '../Components/Routes/Home/state/reducer'
import { reducer as formReducer } from 'redux-form'
import firebase from 'firebase'
import employeesAddReducer from '../Components/Routes/Employees/EmployeesAdd/state/reducer'
import employeesManageReducer from '../Components/Routes/Employees/EmployeesManage/state/reducer'

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyCIs_8n_ROn-WxF4ptSzAz14fI_q0Ls-yY',
  authDomain: 'door-state-project.firebaseapp.com',
  databaseURL: 'https://door-lock-project.firebaseio.com',
  projectId: 'door-state-project'
}
// react-redux-firebase options
const config = {
  userProfile: 'users',
  profileParamsToPopulate: ['businesses:businesses']
  // enableLogging: false
}

firebase.initializeApp(firebaseConfig)

const rootReducer = combineReducers({
  form: formReducer,
  locks: lockReducer,
  employeesManage: employeesManageReducer,
  employeesAdd: employeesAddReducer,
  firebase: firebaseReducer
})

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(getFirebase)),
    reactReduxFirebase(firebase, config)
  )
)
