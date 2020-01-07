
import { Form, Button } from 'semantic-ui-react'
import React from 'react'

import { useField } from '../hooks'

const CommentForm = ({blog, commentBlog}) => {

  const [comment, resetComment] = useField('text')

  const handleNewComment = (event) => {
    console.log('comment: ', comment.value)
    event.preventDefault()
    commentBlog(blog, comment.value)
    resetComment()
  }

  return (
    <div>
      <Form onSubmit={handleNewComment}>
        <Form.Field>
          <input {...comment} />
          <Button type="submit">add comment</Button>
        </Form.Field>
      </Form>
    </div>
  )


}

export default CommentForm