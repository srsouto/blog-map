const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: { directory: require('path').join(__dirname, 'dist') },
    compress: true,
    hot: true,
    port: 8081,
    historyApiFallback: true,
  },
  plugins: [
    new Dotenv(),
    new ReactRefreshWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              require.resolve('react-refresh/babel'),
            ],
          },
        },
      },
    ],
  },
});
