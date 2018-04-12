import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { fetchUsers } from '../actions'

class UserList extends React.Component {
  componentDidMount () {
    if (this.props.users.length === 0) {
      this.props.fetchUsers()
    }
  }

  renderUsers () {
    return this.props.users.map(user => {
      return (
        <li key={user.id}>{user.name}</li>
      );
    });
  }

  head () {
    return (
      <Helmet>
        <title>{`Users ${this.props.users.length}`}</title>
        <meta property='og:title' content='Users'/>
      </Helmet>
    );
  }

  render () {
    return (
      <div>
        {this.head()}
        <h1>Users</h1>
        <ul>
          {this.renderUsers()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users : state.users
  }
}

const mapDispatchToProps = {
  fetchUsers
}

const loadData = (store) => {
  return store.dispatch(fetchUsers());
}

export default {
  loadData,
  component : connect(mapStateToProps, mapDispatchToProps)(UserList)
}
