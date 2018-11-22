const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: ['./src/app/app.tsx'],
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: ['url-loader?limit=100000'] }
        ],
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new Dotenv()
    ],
    devServer: {
        historyApiFallback: true
    }
}