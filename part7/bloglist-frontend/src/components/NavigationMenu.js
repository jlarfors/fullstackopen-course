import { Button, Menu } from 'semantic-ui-react'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../reducers/loginReducer'

const NavigationMenu = (props) => {
  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item link>
          <Link to='/'>Blogs</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link to='/users'>Users</Link>
        </Menu.Item>
        {
          props.user
            ?
            <Menu.Menu position='right'>
              <Menu.Item>
                <Link onClick={props.logout}>Logout</Link>
              </Menu.Item>
            </Menu.Menu>
            :
            ''
        }
      </Menu>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu)