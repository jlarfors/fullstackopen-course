import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

jest.mock('./services/blogs')

import App from './App'

describe('App', () => {
  test('user not logged in - login form shown', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('#app')
    )
    component.debug()
    const login = component.container.querySelectorAll('input[name="username"]')
    expect(login).toBeDefined()
    const password = component.container.querySelectorAll('input[name="password"]')
    expect(password).toBeDefined()

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })

  test('user logged in - login form shown', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('#app')
    )
    component.debug()
    const login = component.container.querySelectorAll('input[name="username"]')
    expect(login.length).toBe(0)
    const password = component.container.querySelectorAll('input[name="password"]')
    expect(password.length).toBe(0)

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)
  })
})