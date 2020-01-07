
import { Table } from 'semantic-ui-react'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { initUsers } from '../reducers/userReducer'

const UserList = (props) => {

  useEffect(() => {
    props.initUsers()
  }, [])

  return (
    <div>
      <Table striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Blogs Created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users.map(user => <Table.Row key={user.id}><Table.Cell><Link to={`/users/${user.id}`}>{user.name} ({user.username})</Link></Table.Cell><Table.Cell>{user.blogs.length}</Table.Cell></Table.Row>)}
        </Table.Body>
      </Table>
    </div>
  )}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  initUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
