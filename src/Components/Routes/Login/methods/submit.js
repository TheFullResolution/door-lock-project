export const submit = (values, dispatch, props) => {
  props.firebase
    .login({
      email: values.email,
      password: values.password
    })
    .then()
}