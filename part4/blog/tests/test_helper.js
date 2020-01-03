
const supertest = require('supertest')

const Blog = require('../models/blog')
const User = require('../models/user')

const app = require('../app')
const api = supertest(app)

const initialBlogs = [
  {
    'title': 'Wind in the Willows',
    'author': 'Batman',
    'url': 'https://github.com/batman/windinthewillows',
    'likes': 5
  }
]

const initialUser = {
  username: 'jlarfors',
  name: 'Jacob Larfors',
  password: 'madeuppassword',
}

const initDb = async () => {
  // init users
  await User.deleteMany({})
  await api
    .post('/api/users')
    .send(initialUser)
    .expect(200)

  // init blogs
  await Blog.deleteMany({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}

const getLoginToken = async () => {
  const response = await api
    .post('/api/login')
    .send(initialUser)

  console.log(`Got authorization token ${response.body.token}`)
  return response.body.token
}

const getInvalidLoginToken = () => {
  return 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUser,
  initDb,
  getLoginToken,
  getInvalidLoginToken,
  blogsInDb,
  usersInDb,
}