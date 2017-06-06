const path = require('path');
const Dotenv = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob_entries = require('webpack-glob-entries');
const values = require('object.values');

let entryPaths = values(glob_entries('./lib/css/**/*.css'));
entryPaths = entryPaths.concat([
    'babel-polyfill',
    './index.jsx',
    './app/scss/base.scss',
]);

module.exports = {
    entry: entryPaths,
    devServer: {
        port: 8080,
        host: 'localhost',
        historyApiFallback: true,
    },
    output: {
        filename: 'bundle.js',
        publicPath: '',
    },
    module: {
        loaders: [
            // {
            //     test: /\.(css|scss)$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: [
            //             {
            //                 loader: 'css-loader',
            //                 options: {
            //                     modules: true,
            //                     importLoader: 1,
            //                     camelCase: true,
            //                     localIdentName: '[local]',
            //                 },
            //             },
            //             { loader: 'sass-loader' },
            //         ],
            //     }),
            // },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: __dirname,
            },
        ],
    },
    plugins: [new ExtractTextPlugin('bundle.css'), new Dotenv()],
};
