
import blogServices from '../services/blogs'

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    console.log('liked: ', { ...blog, likes: blog.likes + 1 })
    const updatedBlog = await blogServices.update({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE',
      data: {
        blog: updatedBlog
      }
    })
  }
}

export const commentBlog = (blog, comment) => {
  console.log('commentBlog: ', blog, comment)
  return async dispatch => {
    const updatedBlog = await blogServices.addComment(blog, { comment })
    dispatch({
      type: 'ADD_COMMENT',
      data: {
        blog: updatedBlog
      }
    })
  }
}

export const createBlog = (newBlog) => {
  console.log('createBlog: ', newBlog)
  return async dispatch => {
    const blog = await blogServices.create(newBlog)
    dispatch({
      type: 'ADD',
      data: blog
    })
  }
}

export const deleteBlog = (blog) => {
  console.log('deleteBlog: ', blog)
  return async dispatch => {
    await blogServices.deleteBlog(blog)
    dispatch({
      type: 'DELETE',
      data: {
        blog
      }
    })
  }
}

const initialState = []

const blogReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'INIT': {
    return action.data
  }
  case 'LIKE': {
    const copy = [...state]
    return copy.map(
      item => item.id === action.data.blog.id ? action.data.blog : item
    )
  }
  case 'ADD_COMMENT': {
    const copy = [...state]
    return copy.map(
      item => item.id === action.data.blog.id ? action.data.blog : item
    )
  }
  case 'ADD': {
    return state.concat(action.data)
  }
  case 'DELETE': {
    return state.filter(item => item.id !== action.data.blog.id)
  }
  default:
    return state
  }
}

export default blogReducer