
import React, { useState, useEffect } from 'react'

import BlogForm from './BlogForm'
import Login from './Login'
import Notification from './Notification'

import blogService from '../services/blogs'
import loginService from '../services/login'

const loggedInBlogUserString = 'loggedInBlogUser'

const App = () => {
    const [blogs, setBlogs] = useState([]) 
    const [newBlog, setNewBlog] = useState({})
    const [showAll, setShowAll] = useState(true)
    const [notification, setNotification] = useState(null)
    const [user, setUser] = useState(null) 
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 
  
    useEffect(() => {
        blogService
        .getAll().then(initialBlogs => {
          setBlogs(initialBlogs)
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

    const handleInputChange = (event) => {
      const target = event.target
      const copy = { ...newBlog }
      copy[target.name] = target.value
      setNewBlog(copy)
    }

    const createBlog = async (event) => {
      event.preventDefault()
      try {
        const blog = await blogService.create(newBlog)
        console.log(blog)
        setBlogs(blogs.concat(blog))

        setNotification({'message' : `New Blog: "${blog.title}" created`, 'status' : 'success'})
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      } catch (error) {
        setNotification({'message' : `Creating Blog Post Failed: ${error.response.data.error}`, 'status' : 'error'})
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      }
    }
  
    const handleLogin = async (event) => {
      event.preventDefault()
      console.log('logging in with', username, password)
      try {
        const user = await loginService.login({username, password})
        setUser(user)
        window.localStorage.setItem(
          loggedInBlogUserString, JSON.stringify(user)
        ) 
        console.log(user)
        setNotification({'message' : 'Login Succeeded!', 'status' : 'success'})
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      } catch (error) {
        setNotification({'message' : `Login Failed: ${error.response.data.error}`, 'status' : 'error'})
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      }
    }

    const handleLogout = () => {
      setUser(null)
      window.localStorage.removeItem(loggedInBlogUserString)
    }
  
    const loginForm = () => {
      return <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin} />
    }

    const blogForm = () => {
      return <BlogForm 
        user={user}
        handleLogout={handleLogout}
        createBlog={createBlog}
        newBlog={newBlog}
        handleInputChange={handleInputChange}
        blogs={blogs}
        />
    }

    return (
      <div>
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
