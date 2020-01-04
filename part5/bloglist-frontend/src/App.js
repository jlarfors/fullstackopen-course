
import React, { useState, useEffect } from 'react'
import { useField } from './hooks'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const loggedInBlogUserString = 'loggedInBlogUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newBlog, setNewBlog] = useState({})
  const newBlog = {
    title: useField('text'),
    author: useField('text'),
    url: useField('text'),
  }
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
      })
  }, [])

  useEffect(() => {
    console.log('Checking if user is logged in...')
    const loggedInUserJSON = window.localStorage.getItem(loggedInBlogUserString)
    if (loggedInUserJSON) {
      console.log('User is Logged In!')
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // const handleInputChange = (event) => {
  //   const target = event.target
  //   const copy = { ...newBlog }
  //   copy[target.name] = target.value
  //   setNewBlog(copy)
  // }

  const blogFormRef = React.createRef()

  const createBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    try {
      const blog = await blogService.create({
        title: newBlog.title.value,
        author: newBlog.author.value,
        url: newBlog.url.value,
      })
      // get blogs again using API to make sure we get the user
      // details of the new blog
      blogService
        .getAll().then(initialBlogs => {
          setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
        })

      setNotification({ 'message' : `New Blog: "${blog.title}" created`, 'status' : 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    } catch (error) {
      setNotification({ 'message' : `Creating Blog Post Failed: ${error.response.data.error}`, 'status' : 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username.value, password.value)
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        loggedInBlogUserString, JSON.stringify(user)
      )
      setNotification({ 'message' : 'Login Succeeded!', 'status' : 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    } catch (error) {
      setNotification({ 'message' : `Login Failed: ${error.response.data.error}`, 'status' : 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem(loggedInBlogUserString)
  }

  const handleLikeButton = (event, blog) => {
    event.stopPropagation()
    console.log(blog)
    blog.likes += 1
    blogService.update(blog)
    setBlogs(
      blogs.map(it => it.id === blog.id ? blog : it)
        .sort((a, b) => b.likes - a.likes))
  }

  const handleRemoveButton = (event, blog) => {
    event.stopPropagation()
    console.log(blog)
    const result = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (result) {
      try {
        blogService.deleteBlog(blog)
        setBlogs(blogs.filter(it => it.id !== blog.id))
        setNotification({ 'message' : `Successfully deleted ${blog.title}`, 'status' : 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      } catch (error) {
        setNotification({ 'message' : `Deleting ${blog.title} failed: ${error.response.data.error}`, 'status' : 'error' })
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      }
    }
  }

  const loginForm = () => {
    return <Login
      username={username}
      password={password}
      handleLogin={handleLogin} />
  }

  const blogForm = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.name} is logged in <button type="submit" onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            createBlog={createBlog}
            newBlog={newBlog}
            // handleInputChange={handleInputChange}
          />
        </Togglable>
        {blogs.map((blog, index) => <Blog key={index} blog={blog} user={user} handleLikeButton={handleLikeButton} handleRemoveButton={handleRemoveButton} />)}
      </div>
    )
  }
  return (
    <div id='app'>
      <Notification notification={notification} />
      {
        user === null ?
          loginForm() :
          blogForm()
      }
    </div>
  )
}

export default App
