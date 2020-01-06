
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { initBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initUser, logout } from './reducers/userReducer'

const App = (props) => {

  useEffect(() => {
    props.initBlogs()
  }, [])

  useEffect(() => {
    console.log('Checking if user is logged in...')
    props.initUser()
  }, [])

  const blogFormRef = React.createRef()

  const loginForm = () => {
    return <Login />
  }

  const blogList = () => {
    return (
      <div>
        <h2>Blogs</h2>
        {props.user.name} is logged in <br />
        <button type="submit" onClick={props.logout}>logout</button>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            blogFormRef={blogFormRef}
          />
        </Togglable>
        <BlogList />
      </div>
    )
  }
  return (
    <div id='app'>
      <Notification />
      {
        props.user === null ?
          loginForm() :
          blogList()
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  initBlogs,
  createBlog,
  likeBlog,
  deleteBlog,

  initUser,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
