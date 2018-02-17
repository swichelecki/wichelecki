var path = require('path');

var webpack = require('webpack');

module.exports = {
    /*  entry: './src/index.js',
      output: { path: __dirname, filename: 'bundle.js'},*/
    entry: {
        index: path.join(__dirname, './src/index.js'),
        admin: path.join(__dirname, './src/index_admin.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: './[name].bundle.js',
    },
    watch: true,
    devServer: {
        contentBase: __dirname + "/src/template/",
        inline: true,
        host: '0.0.0.0',
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
          ]
        }
};
