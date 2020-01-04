
const blogs = [
  {
    id: '1',
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 1,
    user: {
      id: 1,
      username: 'user1',
      name: 'user 1'
    }
  },
  {
    id: '2',
    title: 'title2',
    author: 'author2',
    url: 'url2',
    likes: 2,
    user: {
      id: 1,
      username: 'user1',
      name: 'user 1'
    }
  },
  {
    id: '3',
    title: 'title3',
    author: 'author3',
    url: 'url3',
    likes: 3,
    user: {
      id: 2,
      username: 'user2',
      name: 'user 2'
    }
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (token) => {
  console.log(`Mock setToken${token}`)
}
export default { getAll, setToken }