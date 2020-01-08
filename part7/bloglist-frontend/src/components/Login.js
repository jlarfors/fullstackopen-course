
import { Form, Button } from 'semantic-ui-react'
import React from 'react'
import { connect } from 'react-redux'

import { useField } from '../hooks'

import { login } from '../reducers/loginReducer'
import { showNotification } from '../reducers/notificationReducer'

const Login = (props) => {
  const [username, resetUsername] = useField('username', 'text')
  const [password, resetPassword] = useField('password', 'password')

  const resetForm = () => {
    resetUsername()
    resetPassword()
  }

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with ', username.value, password.value)
    props.login({
      username: username.value,
      password: password.value
    })
    resetForm()
    props.showNotification('Successfully logged in', 'success', 5)
  }

  return (

    <div className='login-form'>
      <h2>Login</h2>

      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>username:</label>
          <input {...username} />
        </Form.Field>
        <Form.Field>
          password:
          <input {...password} />
        </Form.Field>
        <Form.Field>
          <Button type="submit">login</Button>
        </Form.Field>
      </Form>
    </div>
  )}

const mapDispatchToProps = {
  login,
  showNotification
}

export default connect(null, mapDispatchToProps)(Login)
