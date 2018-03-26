import { SubmissionError } from 'redux-form'

export const submit = (values, dispatch, props) => {
  return props.firebase
    .login({
      email: values.email,
      password: values.password
    })
    .catch(e => {
      throw new SubmissionError({ _error: e.message })
    })
}
