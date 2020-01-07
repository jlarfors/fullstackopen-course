import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
// import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: loginReducer,
  users: userReducer,
  notification: notificationReducer,
  // filter: filterReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store