
import { Container } from 'semantic-ui-react'

import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Login from './components/Login'
import NavigationMenu from './components/NavigationMenu'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'
import UserList from './components/UserList'

import { initBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initUser, logout } from './reducers/loginReducer'

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

  const userById = (id) => {
    if (props.users) {
      return props.users.find(user => id === user.id)
    }
  }

  const blogById = (id) => {
    if (props.blogs) {
      return props.blogs.find(blog => id === blog.id)
    }
  }

  const blogList = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <Route exact path="/" render={() =>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              blogFormRef={blogFormRef}
            />
          </Togglable>
        } />
        <Route exact path="/" render={() => <BlogList />} />
        <Route exact path="/blogs/:id" render={({ match }) => <Blog blog={blogById(match.params.id)} singleBlogView={true} />} />
        <Route exact path="/users" render={() => <UserList />} />
        <Route exact path="/users/:id" render={({ match }) => <User user={userById(match.params.id)} />} />
      </div>
    )
  }
  return (
    <Container>
      <Router>
        <NavigationMenu />
        <Notification />
        {
          props.user === null ?
            loginForm() :
            blogList()
        }
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
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
