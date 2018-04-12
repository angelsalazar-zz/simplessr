import 'babel-polyfill'
import express from 'express'
import proxy from 'express-http-proxy'
import favicon from 'express-favicon'
import path from 'path'
import { matchRoutes } from 'react-router-config'

import routes from './client/routes'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    }
}));

app.use(favicon('public/favicon.png'));
app.use(express.static('public'));

app.get('*', (req, res) => {
  const store = createStore(req);

  const promises = matchRoutes(routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null
  }).map((promise) => {
    if (promise) {
      return new Promise((resolve, reject) => {
        promise.then(resolve).catch(resolve)
      })
    }
  });

  Promise
    .all(promises)
    .then(_ => {
      const context = {};
      const content = renderer(req, store, context);

      if (context.url) {
          return res.status(301).redirect(context.url)
      }

      if (context.notFound) {
        res.status(404)
      }

      res.send(content);
    })
});

app.listen(PORT, err => {
  if (err) { throw err }
  console.log(`Server up on port ${PORT}`);
})
