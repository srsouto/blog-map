require('dotenv').config();
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin(['GOOGLE_MAPS_API_KEY', 'CLOUDINARY_CLOUD_NAME', 'SITE_URL']),
  ],
});
