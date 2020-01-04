
import React from 'react'

const BlogForm = ({ createBlog, newBlog, handleInputChange }) => (
  <div>
    <form onSubmit={createBlog}>
      <div>
        title: <input type="text" name="title" onChange={handleInputChange} value={newBlog.title} />
      </div>
      <div>
        author: <input type="text" name="author" onChange={handleInputChange} value={newBlog.author} />
      </div>
      <div>
        url: <input type="text" name="url" onChange={handleInputChange} value={newBlog.url} />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm
