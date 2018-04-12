import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import serialize from 'serialize-javascript'
import { Helmet } from 'react-helmet'

import routes from '../client/routes'

export default (req, store, context) => {
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter
        context={context}
        location={req.path}>
        <div>
          <Switch>
            {renderRoutes(routes)}
          </Switch>
        </div>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return (`
    <!DOCTYPE html>
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="shortcut icon" type="image/png" href="/favicon.ico"/>
        <!-- Compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-alpha.4/css/materialize.min.css">
      </head>
      <body>
        <div id='root'>${markup}</div>
        <script>window.__INITIAL_STATE__ = ${serialize(store.getState())}</script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
}
