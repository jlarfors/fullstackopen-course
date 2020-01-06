
import loginService from '../services/login'
import blogService from '../services/blogs'

const loggedInBlogUserString = 'loggedInBlogUser'

export const initUser = () => {
  const loggedInUserJSON = window.localStorage.getItem(loggedInBlogUserString)
  if (loggedInUserJSON) {
    console.log('User is Logged In!')
    const user = JSON.parse(loggedInUserJSON)
    blogService.setToken(user.token)
    return dispatch => {
      dispatch({
        type: 'SET',
        data: { user }
      })
    }
  }
  return dispatch => {
    dispatch({
      type: 'NOTHING',
    })
  }
}

export const login = (credentials) => {
  return async dispatch => {
    console.log('login: ', credentials.username)
    console.log('login: ', credentials.password)
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    window.localStorage.setItem(
      loggedInBlogUserString, JSON.stringify(user)
    )
    dispatch({
      type: 'LOGGED_IN',
      data: {
        user
      }
    })
  }
}

export const logout = () => {
  return async dispatch => {
    console.log('logout')
    blogService.setToken(null)
    window.localStorage.removeItem(loggedInBlogUserString)
    dispatch({
      type: 'LOGGED_OUT'
    })
  }
}

const initialState = null

const userReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'SET': {
    return action.data.user
  }
  case 'LOGGED_IN': {
    return action.data.user
  }
  case 'LOGGED_OUT': {
    return null
  }
  default:
    return state
  }
}

export default userReducer