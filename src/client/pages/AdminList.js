import React from 'react'
import { connect } from 'react-redux'
import { fetchAdmins } from '../actions'

import requireAuth from '../components/hocs/requireAuth'

class AdminList extends React.Component {
  componentDidMount () {
    if (this.props.admins.length === 0) {
      this.props.fetchAdmins()
    }
  }

  renderAdmins () {
    return this.props.admins.map(admin => {
      return (
        <li key={admin.id}>{admin.name}</li>
      );
    });
  }

  render () {
    return (
      <div>
        <h1>Admins</h1>
        <ul>
          {this.renderAdmins()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ admins }) => {
  return { admins }
}

const mapDispatchToProps = {
  fetchAdmins
}

export default {
  component : connect(mapStateToProps, mapDispatchToProps)(requireAuth(AdminList)),
  loadData : ({ dispatch }) => {
    return dispatch(fetchAdmins())
  }
}
