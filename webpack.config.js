var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    index: ['index'],
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
    root: path.join(__dirname, 'src')
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
