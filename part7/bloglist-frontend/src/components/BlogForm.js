
import React from 'react'
import { connect } from 'react-redux'

import { initBlogs, createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'

const BlogForm = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const formReset = () => {
    titleReset()
    authorReset()
    urlReset()
  }
  const createBlog = async (event) => {
    event.preventDefault()
    props.blogFormRef.current.toggleVisibility()

    console.log('title: ', title)
    console.log('author: ', author)
    console.log('url: ', url)

    try {
      await props.createBlog({
        title: title.value,
        author: author.value,
        url: url.value
      })
      props.initBlogs()

      formReset()

      props.setNotification({ 'message' : `New Blog: "${title.value}" created`, 'status' : 'success' })
      setTimeout(() => {
        props.setNotification(null)
      }, 2000)
    } catch (error) {
      props.setNotification({ 'message' : `Creating Blog Post Failed: ${error.response.data.error}`, 'status' : 'error' })
      setTimeout(() => {
        props.setNotification(null)
      }, 2000)
    }
  }

  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          title: <input {...title} />
        </div>
        <div>
          author: <input {...author} />
        </div>
        <div>
          url: <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )}

const mapDispatchToProps = {
  initBlogs,
  createBlog,
}

export default connect(null, mapDispatchToProps)(BlogForm)
