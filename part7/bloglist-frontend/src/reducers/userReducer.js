
import userService from '../services/users'

export const initUsers = () => {
  return async dispatch => {
    console.log('initUsers')
    const users = await userService.getAll()
    console.log('users: ', users)
    dispatch({
      type: 'INIT_USERS',
      data: {
        users
      }
    })
  }
}

const initialState = []

const userReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'INIT_USERS': {
    console.log('setting: ', action.data.users)
    return action.data.users
  }
  default:
    return state
  }
}

export default userReducer