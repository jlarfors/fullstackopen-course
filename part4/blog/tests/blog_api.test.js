
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')

const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('some initial blogs in db', () => {
  beforeEach(async () => {
    await helper.initDb()
  })
  describe('getting blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('blogs id field is named id', async () => {
      const response = await api.get('/api/blogs')
      // check that a blog exists
      expect(response.body[0]).toBeDefined()
      // check that the field id exists
      expect(response.body[0].id).toBeDefined()
    })
  })
  
  describe('creating blogs', () => {
    test('create a new blog', async () => {

      const newBlog = {
        'title': 'Wind in the Willows',
        'author': 'Batman',
        'url': 'https://github.com/batman/windinthewillows',
        'likes': 5
      }
    
      const blogsAtBeginning = await api.get('/api/blogs')
      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${await helper.getLoginToken()}`)
        .send(newBlog)
    
      expect(response.status).toBe(200)
      expect(response.body).toMatchObject(newBlog)
      
      const blogsAtEnd = await api.get('/api/blogs')
      expect(blogsAtEnd.body.length).toBe(blogsAtBeginning.body.length + 1)
    })
    
    test('create a new blog - missing likes field', async () => {
      const newBlog = {
        'title': 'Wind in the Willows',
        'author': 'Batman',
        'url': 'https://github.com/batman/windinthewillows',
      }
    
      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${await helper.getLoginToken()}`)
        .send(newBlog)
    
      expect(response.status).toBe(200)
      expect(response.body).toMatchObject(newBlog)
      // 0 is the default likes
      expect(response.body.likes).toBeDefined()
      expect(response.body.likes).toBe(0)
    
    })
    
    test('create a new blog - missing required fields', async () => {
      const newBlog = {
        // blog is missing title and URL
        'author': 'Batman',
      }
    
      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${await helper.getLoginToken()}`)
        .send(newBlog)
    
      // response should be HTTP code 400
      expect(response.status).toBe(400)
    })
  })
  
  describe('deleting blogs', () => {
    test('create and delete a blog', async () => {
      const newBlog = {
        'title': 'Wind in the Willows',
        'author': 'Batman',
        'url': 'https://github.com/batman/windinthewillows',
      }
  
      const createResponse = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${await helper.getLoginToken()}`)
        .send(newBlog)
      
      expect(createResponse.status).toBe(200)
      // console.log(createResponse.body.id)
  
      const idToDelete = createResponse.body.id
      await api
        .delete(`/api/blogs/${idToDelete}`)
        .set('Authorization', `bearer ${await helper.getLoginToken()}`)
        .expect(204)
  
      const getResponse = await api.get('/api/blogs')
      const ids = getResponse.body.map(blog => blog.id)
      expect(ids).not.toContain(idToDelete)
    })
    test('create and delete a blog - invalid auth token', async () => {
      const newBlog = {
        'title': 'Wind in the Willows',
        'author': 'Batman',
        'url': 'https://github.com/batman/windinthewillows',
      }
  
      const createResponse = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${await helper.getLoginToken()}`)
        .send(newBlog)
      
      expect(createResponse.status).toBe(200)
      // console.log(createResponse.body.id)
  
      const idToDelete = createResponse.body.id
      await api
        .delete(`/api/blogs/${idToDelete}`)
        .set('Authorization', `bearer ${await helper.getInvalidLoginToken()}`)
        .expect(401)
  
      const getResponse = await api.get('/api/blogs')
      const ids = getResponse.body.map(blog => blog.id)
      expect(ids).toContain(idToDelete)
    })
  })
  
  describe('updating blogs', () => {
    test('create and update a blog', async () => {
      let newBlog = {
        'title': 'Wind in the Willows',
        'author': 'Batman',
        'url': 'https://github.com/batman/windinthewillows',
      }
  
      const createResponse = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${await helper.getLoginToken()}`)
        .send(newBlog)
      
      expect(createResponse.status).toBe(200)
      const idToUpdate = createResponse.body.id
      
      // change the author
      newBlog.author = 'Robin'
  
      const updateResponse = await api
        .put(`/api/blogs/${idToUpdate}`)
        .send(newBlog)
  
      expect(updateResponse.status).toBe(200)
      expect(updateResponse.body.author).toBe('Robin')
  
    })
  })
})


describe('create users', () => {
  beforeEach(async () => {
    await helper.initDb()
  })

  test('create user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Root User',
      password: 'madeuppassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('create user fails if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(helper.initialUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('create user fails if username too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ab', // too short
      name: 'otherroot',
      password: 'other',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('create user fails if password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'abc',
      name: 'otherroot',
      password: 'ab', // too short
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
