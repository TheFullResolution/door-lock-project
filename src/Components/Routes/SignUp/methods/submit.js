import { SubmissionError } from 'redux-form'

export const submit = (values, dispatch, props) => {
  return props.firebase
    .createUser(
      {
        email: values.email,
        password: values.password
      },
      {
        email: values.email,
        name: values.name,
        lastname: values.lastname,
        roles: {
          admin: false,
          employee: true
        }
      }
    )
    .catch(e => {
      throw new SubmissionError({ _error: e.message })
    })
}
