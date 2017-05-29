const { resolve } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OfflinePlugin = require('offline-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    context: resolve(__dirname, '../src'),
    entry: {
        app: './index.js',
        vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: resolve(__dirname, '../dist'),
        filename: '[name].[chunkhash:10].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(sass|scss)$/,
            use: ExtractTextPlugin.extract(['css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]",camelCase'])
        }]
    },
    devtool: 'source-map',
    performance: {
        hints: 'error'
    },
    resolve: {
        alias: {
            react: 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: resolve(__dirname, '..')
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
        }),
        new ExtractTextPlugin({
            filename: 'style.[chunkhash:10].css',
            allChunks: true
        }),
        new OfflinePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new CopyWebpackPlugin([{
            from: resolve(__dirname, '../src/icons/'),
            to: resolve(__dirname, '../dist/')
        }])
    ]
};