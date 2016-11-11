var path = require('path');
var webpack = require('webpack');
var CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: './app.js',
  output: { path: __dirname + '/../server/static/js/', filename: 'bundle.js' },
  plugins: [
    new CircularDependencyPlugin({
      failOnError: true
    })
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};

