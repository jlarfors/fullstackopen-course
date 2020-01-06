
import React from 'react'
import { connect } from 'react-redux'

import { useField } from '../hooks'

import { login } from '../reducers/userReducer'
import { showNotification } from '../reducers/notificationReducer'

const Login = (props) => {
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')

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

      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )}

const mapDispatchToProps = {
  login,
  showNotification
}

export default connect(null, mapDispatchToProps)(Login)
