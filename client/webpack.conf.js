const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // other webpack configuration
    entry: './src/index.tsx',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },

    plugins: [
        {
            apply: function (compiler) {
                new CopyWebpackPlugin({
                    patterns: [
                        { from: path.resolve(__dirname, '../surface'), to: '' },
                    ],
                }).apply(compiler);
            },
        },
    ],

    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true,
    },
};