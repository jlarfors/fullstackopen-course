import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let blog = {
    title: 'default title',
    author: 'default author',
    likes: 0
  }
  let onClick = null
  let component = null

  test('title, author and number of likes are shown', () => {
    component = render(
      <SimpleBlog blog={blog} onClick={onClick} />
    )
    const titleDiv = component.container.querySelector('.title')
    expect(titleDiv).toHaveTextContent(
      'default title'
    )
    const authorDiv = component.container.querySelector('.author')
    expect(authorDiv).toHaveTextContent(
      'default author'
    )
    const likesDiv = component.container.querySelector('.likes')
    expect(likesDiv).toHaveTextContent(
      'blog has 0 likes'
    )
  })

  test('like button pressed twice', () => {

    const mockHandler = jest.fn()
    onClick = mockHandler
    component = render(
      <SimpleBlog blog={blog} onClick={onClick} />
    )
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})