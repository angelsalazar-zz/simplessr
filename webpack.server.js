const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');

const baseConfig = require('./webpack.base');

const config = {
  // build for node
  target : 'node',
  // set entry point
  entry : './src/index.js',
  externals : [webpackNodeExternals()],
  // set out directory
  output : {
    filename : 'bundle.js',
    path : path.resolve(__dirname, 'build')
  }
};

module.exports = merge(baseConfig, config);
