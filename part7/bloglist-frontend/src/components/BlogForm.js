
import { Form, Button } from 'semantic-ui-react'
import React from 'react'
import { connect } from 'react-redux'

import { initBlogs, createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const BlogForm = (props) => {
  const [title, titleReset] = useField('title', 'text')
  const [author, authorReset] = useField('author', 'text')
  const [url, urlReset] = useField('url', 'text')

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

      props.showNotification(`New Blog: "${title.value}" created`, 'success')
      setTimeout(() => {
        props.showNotification(null)
      }, 2000)
    } catch (error) {
      console.log('error: ', error)
      props.showNotification(`Creating Blog Post Failed: ${error.response.data.error}`, 'error' )
      setTimeout(() => {
        props.showNotification(null)
      }, 2000)
    }
  }

  return (
    <div>
      <Form onSubmit={createBlog}>
        <Form.Field>
          <label>title:</label>
          <input {...title} />
        </Form.Field>
        <Form.Field>
          <label>author:</label>
          <input {...author} />
        </Form.Field>
        <Form.Field>
          <label>url:</label>
          <input {...url} />
        </Form.Field>
        <Form.Field>
          <Button type="submit">create</Button>
        </Form.Field>
      </Form>
    </div>
  )}

const mapDispatchToProps = {
  initBlogs,
  createBlog,
  showNotification
}

export default connect(null, mapDispatchToProps)(BlogForm)
