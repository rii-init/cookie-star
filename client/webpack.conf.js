const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


// get output path from environment variable
const DIST_PATH = 
        path.resolve(__dirname,
            process.env.DIST_PATH 
                ? "../"+process.env.DIST_PATH
                : '../dist'
        ); 

module.exports = {
    entry: './src/index.tsx',
   
    output: {
        path: DIST_PATH,
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
            directory: DIST_PATH, // This tells webpack-dev-server to serve static files from '../surface' directory
        },
        devMiddleware: {
            publicPath: '/dist/', // This should match the publicPath in output configuration
        },
        port: 9000,
        hot: true
    },
};