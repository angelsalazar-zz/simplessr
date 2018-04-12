import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Header = ({ auth }) => {
  console.log('Status : ', auth);
  const authButton = (
    auth
    ? <a href='/api/logout'>Log Out</a>
    : <a href='/api/auth/google'>Log In</a>
  )
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to='/' className="brand-logo">Logo</Link>
        <ul className="right">
          <li><Link to='/users'>Users</Link></li>
          <li><Link to='/admins'>Admins</Link></li>
          <li>{authButton}</li>
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps)(Header);
