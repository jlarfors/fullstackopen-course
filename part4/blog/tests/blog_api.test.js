
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('getting blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('blogs id field is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(element => {
      console.log(element.whatever)
      console.log(element)
    })
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
      .send(newBlog)
    
    expect(createResponse.status).toBe(200)
    // console.log(createResponse.body.id)

    const idToDelete = createResponse.body.id
    await api
      .delete(`/api/blogs/${idToDelete}`)
      .expect(204)

    const getResponse = await api.get('/api/blogs')
    const ids = getResponse.body.map(blog => blog.id)
    expect(ids).not.toContain(idToDelete)
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

afterAll(() => {
  mongoose.connection.close()
})
