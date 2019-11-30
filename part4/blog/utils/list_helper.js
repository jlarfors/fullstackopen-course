
const lodash = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, it) => sum + it['likes'], 0)
}

const favoriteBlog = (blogs) => {
  const maxIndex = blogs.reduce((maxIndex, it, curIndex) => {
    if (it['likes'] > maxIndex) {
      maxIndex = curIndex
    }
    return maxIndex
  }, -1)
  console.log('MAX INDEX = ', maxIndex)
  if (maxIndex >= 0) {
    const blog = blogs[maxIndex]
    return {
      title: blog['title'],
      author: blog['author'],
      likes: blog['likes']
    }
  }
}

const mostBlogs = (blogs) => {
  const result = lodash(lodash.map(blogs, 'author'))
    .countBy()
    .entries()
    .maxBy(lodash.last)

  console.log(result)
  console.log(lodash.head(result))
  console.log(lodash.last(result))

  return {
    author: lodash.head(result),
    blogs: lodash.last(result)
  }
}

const mostLikes = (blogs) => {
  const group = lodash.groupBy(blogs, 'author')
  const mostLikes = lodash(
    lodash.toPairs(
      lodash.mapValues(
        group, (blogs) => lodash.reduce(blogs, (sum, i) => sum + i['likes'], 0)
      )))
    .maxBy(lodash.last)
  return {
    author: lodash.head(mostLikes),
    likes: lodash.last(mostLikes),
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}