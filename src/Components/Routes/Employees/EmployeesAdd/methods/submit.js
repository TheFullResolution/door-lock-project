import { SubmissionError } from 'redux-form'
import { searchUsers } from '../state/actions'

export const submit = (values, dispatch, props) => {
  return dispatch(searchUsers(values.email)).catch(e => {
    throw new SubmissionError({ _error: e.message })
  })
}
