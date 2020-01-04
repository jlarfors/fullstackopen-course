
import React from 'react'

const BlogForm = ({ createBlog, newBlog }) => {
  const { reset: titleReset, ...titleInput } = newBlog.title
  const { reset: authorReset, ...authorInput } = newBlog.author
  const { reset: urlReset, ...urlInput } = newBlog.url
  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          title: <input {...titleInput} />
        </div>
        <div>
          author: <input {...authorInput} />
        </div>
        <div>
          url: <input {...urlInput} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )}

export default BlogForm
