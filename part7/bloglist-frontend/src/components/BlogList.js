
import React from 'react'
import { connect } from 'react-redux'

import { Segment } from 'semantic-ui-react'

import Blog from './Blog'

import { createBlog, likeBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const BlogList = (props) => {

  return (
    <div>
      {
        props.blogs.map(blog =>
          <Segment key={blog.id} piled>
            <Blog
              blog={blog}
              singleBlogView={false} />
          </Segment>
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
