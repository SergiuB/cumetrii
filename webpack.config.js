var webpack = require('webpack');
var path = require('path');
var isProduction = !!process.env.BUILD_PROD;
var HtmlWebpackPlugin = require('html-webpack-plugin')
var plugins = [
  new HtmlWebpackPlugin({
    title: 'Cumetrii',
    template: 'assets/index.html',
    inject: 'body'
  }),
  new webpack.ProvidePlugin({
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
})];
var devtool;

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        //3rd party modules have a lot of warnings
        warnings: false
    }
  }));
} else {
  devtool = 'source-map';
}

module.exports = {
  context: __dirname + '/src',
  entry: ['./index.jsx'],
  output: {
    path: __dirname + '/www',
    filename: 'bundle.js'
  },
  devtool: devtool,
  module: {
    loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url?limit=10000' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader:"url?prefix=font/&limit=100000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  plugins: plugins
};
