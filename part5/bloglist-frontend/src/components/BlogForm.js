
import React from 'react'
import Blog from './Blog'

const BlogForm = ({ user, handleLogout, createBlog, newBlog, handleInputChange, blogs }) => (
  <div>
    <h2>Blogs</h2>
    <p>{user.name} is logged in <button type="submit" onClick={handleLogout}>logout</button></p>
  
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
    
    {blogs.map((blog, index) => <Blog key={index} blog={blog}/>)}
  </div>
)

export default BlogForm
