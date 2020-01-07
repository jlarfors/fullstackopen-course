
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addComment = async (object, comment) => {
  const response = await axios.post(`${baseUrl}/${object.id}/comments`, comment)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async object => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object)
  return response.data
}

const deleteBlog = async object => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${object.id}`, config)
  return response.data
}

export default {
  setToken,
  getAll,
  addComment,
  create,
  update,
  deleteBlog
}
