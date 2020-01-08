
const loginAsAdmin = () => {
  cy.get('#username')
    .type('admin')
  cy.get('#password')
    .type('admin')
  cy.contains('login')
    .click()
}

describe('Blog', function() {
  before(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Admin User',
      username: 'admin',
      password: 'admin'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  describe('When logged in...', function() {
    beforeEach(function() {
      loginAsAdmin()
    })

    it('User is logged in', function() {
      cy.contains('Logged in as admin')
    })
    it('New blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.get('#title')
        .type('Automating E2E Tests with Cypress')
      cy.get('#author')
        .type('Some Badman')
      cy.get('#url')
        .type('https://www.cypress.io/')
      cy.contains('create')
        .click()
      cy.contains('Automating E2E Tests with Cypress')
    })
    it('New blog can be deleted', function() {
      cy.contains('Automating E2E Tests with Cypress')
        .click()
      cy.contains('remove')
        .click()
    })

  })

})
