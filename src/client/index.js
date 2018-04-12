import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import axios from 'axios'

import reducers from './reducers'
import routes from './routes'


const axiosInstance = axios.create({
  baseURL : '/api'
});
const initialState = window.__INITIAL_STATE__ || {};
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

ReactDOM
  .hydrate(
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            {renderRoutes(routes)}
          </Switch>
        </div>
      </Router>
    </Provider>,
    document.querySelector('#root')
  );
