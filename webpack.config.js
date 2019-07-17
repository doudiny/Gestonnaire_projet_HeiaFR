'use strict';

const path = require('path');

const SRC_DIR = path.join(__dirname, '/react-client/src/');
const DIST_DIR = path.join(__dirname, '/react-client/dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');



module.exports = {
  entry: ['babel-polyfill', './react-client/src'],
  watch: true,
  devtool: false,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './react-client/public/index.html',
      //favicon: './public/favicon.ico'
    }),
    /*new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:8080/ during development,
      // dist directory is being served
      host: 'localhost',
      port: 8080,
      server: { baseDir: ['react-client/dist'] }
    }),
    */
  ]
};