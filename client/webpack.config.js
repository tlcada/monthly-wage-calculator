'use strict';

const webpack = require('webpack');
const path = require('path');

const config = {
    devtool: "source-map",
    context: path.resolve(__dirname, "./src"),
    entry: {
        app: "./index.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist/assets"),
        filename: "[name].bundle.js",
        publicPath: "/assets"
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/, //Check for all js files
                exclude: [/node_modules/],
                use: [{
                    loader: "babel-loader"
                }]
            },
            {
                test: /\.(sass|scss)$/, //Check for sass or scss file names
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};

module.exports = config;
