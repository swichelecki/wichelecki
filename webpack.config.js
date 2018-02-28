var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true
});

var HtmlWebpackPlugin = require('html-webpack-plugin');

var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: path.join(__dirname, './src/index.js'),
        admin: path.join(__dirname, './src/index_admin.js')
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].bundle.js',
        //publicPath: '/dist'
    },
    watch: true,
    devServer: {
        contentBase: __dirname + "/src",
        filename: '.dist/[name].bundle.js',
        inline: true,
        host: '0.0.0.0',
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-0']
                    }
                  }
                ],
                exclude: /node_modules/
            },
            {
               test: /\.css$/,
               use: extractPlugin.extract({
                 use: ['css-loader']
               })//,
              // use: ['style-loader', 'css-loader']
             },
             {
               test: /\.html$/,
               use: ['html-loader']
             },
             {
               test: /\.(jpg|png)$/,
               use: [
                 {
                   loader: 'file-loader',
                   options: {
                     name: '[name].[ext]',
                     outputPath: 'images/',
                     publicPath: 'images/'
                  }
                }
              ]
            }
          ]
      },
      resolve: {
        //  extensions: ['.js', '.jsx'],
          alias: {
            normalize: path.join(__dirname, '/node_modules/normalize.css')
          }
      },
      plugins: [
          new HtmlWebpackPlugin({
              filename: 'index.html',
              template: 'src/index.html',
              chunks: []
          }),
          new HtmlWebpackPlugin({
              filename: 'admin.html',
              template: 'src/admin.html',
              chunks: []
          }),
          new CleanWebpackPlugin(['dist']),
          extractPlugin
      ]
};
