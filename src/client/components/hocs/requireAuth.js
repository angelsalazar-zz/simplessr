import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default (Cmp) => {
  class RequireAuth extends React.Component {

    checkAuth () {
      const { auth } = this.props;
      switch (auth) {
        case false: {
          return <Redirect to='/' />
        }
        case null: {
          return <div>Loading...</div>
        }
        default: {
          return <Cmp {...this.props}/>
        }
      }
    }

    render () {
      return this.checkAuth();
    }
  }

  const mapStateToProps = ({ auth }) => {
    return { auth }
  }

  return connect(mapStateToProps)(RequireAuth);
}
