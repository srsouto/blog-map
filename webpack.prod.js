const merge = require('webpack-merge');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const webpack = require('webpack');
const slugify = require('slugify');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common.js');

const trips = require('./src/trips/trips.json');
const sitemapPaths = ['/'];
trips.forEach(trip => {
  sitemapPaths.push(`/${trip.id}/`);

  trip.entries.forEach(entry => {
    const entrySlug = slugify(entry.title, { lower: true, remove: /[:,]/ });
    sitemapPaths.push(`/${trip.id}/${entry.id}-${entrySlug}`);
  });
});

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new SitemapPlugin('https://blog.stevensouto.com', sitemapPaths),
    new webpack.EnvironmentPlugin(['GOOGLE_MAPS_API_KEY']),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
});
