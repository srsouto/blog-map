const merge = require('webpack-merge');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  serve: {
    add: (app, middleware, options) => {
      app.use(convert(history()));
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 8080,
    historyApiFallback: true,
  },
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' }
  },
  plugins: [
    new Dotenv()
  ],
});
