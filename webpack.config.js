var webpack = require('webpack');
var path    = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var pjson = require('./package.json');

var extractCSS = new ExtractTextPlugin({
  filename: 'css/main.css',
  allChunks: true
});

module.exports = {
    entry: {
      'common': './src/app.js'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader!resolve-url-loader') },
            {
              test: /\.scss$/,
              use: extractCSS.extract({
                use: [
                  {
                    loader:'css-loader'
                  },
                  {
                    loader: 'resolve-url-loader'
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        includePaths: [
                          path.resolve(__dirname, './src'),
                          path.resolve(__dirname, './src/assets/scss')
                        ],
                    }
                  }
              ],
                fallback: 'style-loader'
              })
            },

      			{ test: /\.woff$/,loader: 'url-loader?limit=5000&mimetype=application/font-woff&name=fonts/[name].[hash].[ext]' }, // jshint ignore:line
      			{ test: /\.ttf$/, loader: 'file-loader?name=fonts/[name].[hash].[ext]' },
      			{ test: /\.eot$/, loader: 'file-loader?name=fonts/[name].[hash].[ext]' },
      			{ test: /\.svg$/, loader: 'file-loader?name=fonts/[name].[hash].[ext]' },

            { test: /\.hbs$/,       loader: 'handlebars-loader' },

            { test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=img/[name].[ext]' }
        ]
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000,
      open: true
    },
    resolve: {
      modules: [
        'node_modules',
        'src'
      ],
      alias: {
        'backbone':             path.resolve('./vendor/backbone-min.js'),
        'backbone.marionette':  path.resolve('./vendor/backbone.marionette.js'),
        'backbone.radio':       path.resolve('./vendor/backbone.radio.js'),
        
        'bluebird':             path.resolve('./vendor/bluebird.min.js'),
        'jquery':               path.resolve('./vendor/jquery-1.12.0.min.js'),

        'underscore':           path.resolve('./vendor/underscore-min.js'),
        
        'store':                path.resolve('./vendor/store.js'),
      }
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/),
      extractCSS
    ]
};
