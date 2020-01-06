
import React, { useState } from 'react'

const Blog = ({ blog, user, handleLikeButton, handleRemoveButton }) => {
  const [showDetailed, setShowDetailed] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDetailToggle = () => {
    setShowDetailed(!showDetailed)
  }

  let removeButton = null
  if (blog.user.id === user.id) {
    removeButton = <button onClick={(event) => handleRemoveButton(event, blog)}>remove</button>
  }

  return (
    <div className="blog" style={blogStyle} onClick={handleDetailToggle}>

      {
        showDetailed ?
          // detailed view
          <div>
            <div className="blog-title">{blog.title}</div> <div className="blog-author">{blog.author}</div> <br/>
            <div className="blog-url"><a href={blog.url}>{blog.url}</a></div> <br/>
            {blog.likes} likes <button onClick={(event) => handleLikeButton(event, blog)}>like</button> <br/>
            added by {blog.user.name} <br/>
            {removeButton}
          </div> :
          // minimal view
          <div>
            <div className="blog-title">{blog.title}</div> <div className="blog-author">{blog.author}</div> <br/>
          </div>
      }

    </div>
  )}

export default Blog
