
import { Button } from 'semantic-ui-react'
import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter} from 'react-router-dom'

import CommentForm from './CommentForm'

import { likeBlog, commentBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const Blog = withRouter((props) => {

  const handleLikeButton = (event) => {
    event.stopPropagation()
    console.log(props.blog)
    props.likeBlog(props.blog)
    props.showNotification(`You liked ${props.blog.title}`, 'success', 2)
  }

  const handleRemoveButton = (event) => {
    event.stopPropagation()
    console.log(props.blog)
    const result = window.confirm(`Remove blog "${props.blog.title}" by ${props.blog.author}?`)
    if (result) {
      try {
        props.deleteBlog(props.blog)
        props.showNotification(`Successfully deleted ${props.blog.title}`, 'success', 5)
        props.history.push('/')
      } catch (error) {
        props.showNotification(`Deleting ${props.blog.title} failed: ${error.response.data.error}`, 'error', 5)
      }
    }
  }

  if (!props.user || !props.blog) {
    return ''
  }

  let removeButton = null
  if (props.blog.user.id === props.user.id) {
    removeButton = <Button onClick={(event) => handleRemoveButton(event)}>remove</Button>
  }

  if (props.singleBlogView){
    return (
      <div className="blog">
        <h2>{props.blog.title}</h2>
        <div className="blog-url"><a href={props.blog.url}>{props.blog.url}</a></div> <br/>
        {props.blog.likes} likes <Button onClick={(event) => handleLikeButton(event)}>like</Button> <br/>
        added by {props.blog.user.name} <br/>
        {removeButton}
        <h3>Comments</h3>
        <CommentForm blog={props.blog} commentBlog={props.commentBlog} />
        <ul>
          {props.blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
        </ul>
      </div>
    )
  } else {
    return (
      <div className="blog">
        <Link to={`/blogs/${props.blog.id}`}>{props.blog.title}</Link>
      </div>

    )
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  likeBlog,
  commentBlog,
  deleteBlog,

  showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
