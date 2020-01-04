
import React from 'react'

const Login = ({ username, password, handleLogin }) => {
  const { reset: usernameReset, ...usernameInput } = username
  const { reset: passwordReset, ...passwordInput } = password
  return (

    <div className='login-form'>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...usernameInput} />
        </div>
        <div>
          password
          <input {...passwordInput} />
        </div>
        <button type="submit">login</button>
        <button type="submit">login</button>
      </form>
    </div>
  )}

export default Login
