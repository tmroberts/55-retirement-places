var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractSCSS = new ExtractTextPlugin('style.css');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'client');
var SCSS_DIR = path.resolve(__dirname, 'client/scss');

var config = {
  entry: APP_DIR + '/react-root.jsx',
  devtool: 'source-map',
  output: {
    path: BUILD_DIR,
    filename: 'app.bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
        test: /\.scss$/,
        //loaders: ["style", "css?sourceMap", "sass?sourceMap"]
        loader: extractSCSS.extract(['css?sourceMap','sass?sourceMap'])
      },

      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  sassLoader: {
    includePaths: [SCSS_DIR]
  },
  plugins: [
    extractSCSS
  ]
};

module.exports = config;
