var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    noml: ['noml']
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
    root: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'examples')
    ]
  },
  module: {
    loaders: [
      {
        name: 'ts',
        test: /\.ts?$/,
        loader: 'ts-loader'
      }
    ]
  }
}
