
import React from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'

import { createBlog, likeBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogList = (props) => {
  const handleLikeButton = (event, blog) => {
    event.stopPropagation()
    console.log(blog)
    props.likeBlog(blog)
    props.showNotification(`You liked ${blog.title}`, 'success', 2)
  }

  const handleRemoveButton = (event, blog) => {
    event.stopPropagation()
    console.log(blog)
    const result = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    if (result) {
      try {
        props.deleteBlog(blog)
        props.showNotification(`Successfully deleted ${blog.title}`, 'success', 5)
      } catch (error) {
        props.showNotification(`Deleting ${blog.title} failed: ${error.response.data.error}`, 'error', 5)
      }
    }
  }

  return (
    <div>
      {
        props.blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={props.user}
            handleLikeButton={handleLikeButton}
            handleRemoveButton={handleRemoveButton} />
        )}
    </div>
  )}

const orderToShowBlogs = ({ blogs }) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

const mapStateToProps = (state) => {
  return {
    blogs: orderToShowBlogs(state),
    user: state.user
  }
}

const mapDispatchToProps = {
  createBlog,
  likeBlog,
  deleteBlog,

  showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)
