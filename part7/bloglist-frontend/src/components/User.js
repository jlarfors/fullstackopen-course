
import React from 'react'

const User = ({ user }) => {

  if (!user) {
    return ''
  }
  user.blogs.forEach(blog => console.log(blog))
  return (
    <div>
      <h2>{user.name} ({user.username})</h2>
      <h3>Added Blogs:</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )}

export default User
