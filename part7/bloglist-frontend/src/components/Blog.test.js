import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Blog from './Blog'

describe('<Blog />', () => {

  let blog = {
    title: 'default title',
    author: 'default author',
    url: 'default url',
    likes: 0,
    user: {
      id: '123',
      name: 'default user'
    }
  }

  let user = {
    id: '123',
    username: 'admin',
  }
  let handleLikeButton = null
  let handleRemoveButton = null

  beforeEach(() => {
    handleLikeButton = jest.fn()
    handleRemoveButton = jest.fn()
  })

  test('title and author displayed by default', () => {
    const component = render(
      <Blog blog={blog} user={user} handleLikeButton={handleLikeButton} handleRemoveButton={handleRemoveButton} />
    )
    const titleDiv = component.container.querySelector('.blog-title')
    expect(titleDiv).toHaveTextContent(
      'default title'
    )
    const authorDiv = component.container.querySelector('.blog-author')
    expect(authorDiv).toHaveTextContent(
      'default author'
    )
  })

  test('detailed view after blog clicked', () => {
    const component = render(
      <Blog blog={blog} user={user} handleLikeButton={handleLikeButton} handleRemoveButton={handleRemoveButton} />
    )
    const blogDiv = component.container.querySelector('.blog')
    fireEvent.click(blogDiv)

    const titleDiv = component.container.querySelector('.blog-title')
    expect(titleDiv).toHaveTextContent(
      'default title'
    )
    const authorDiv = component.container.querySelector('.blog-author')
    expect(authorDiv).toHaveTextContent(
      'default author'
    )
    const urlDiv = component.container.querySelector('.blog-url')
    expect(urlDiv).toHaveTextContent(
      'default url'
    )
    expect(blogDiv).toHaveTextContent(
      'default user'
    )
  })

})