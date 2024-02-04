const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
   
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/', // This is important. It tells webpack-dev-server to serve bundle.js from memory at this path
    },
    
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    
    
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ],

    devServer: {
        static: {
            directory: path.join(__dirname, '../surface'), // This tells webpack-dev-server to serve static files from '../surface' directory
        },
        devMiddleware: {
            publicPath: '/dist/', // This should match the publicPath in output configuration
        },
        port: 9000,
        hot: true
    },
};