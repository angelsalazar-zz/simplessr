import React from 'react'

import App from './components/App'

import Home from './pages/Home'
import UserList from './pages/UserList'
import NotFound from './pages/NotFound'
import AdminList from './pages/AdminList'

export default [
  {
    ...App,
    routes : [{
      path : '/admins',
      ...AdminList
    }, {
      path : '/users',
      ...UserList
    }, {
      path : '/',
      exact : true,
      ...Home
    }, {
      ...NotFound
    }]
  }
];
