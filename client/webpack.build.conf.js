const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../surface/static/js'),
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        usedExports: true,
    },
    plugins: [
        new ManifestPlugin({ fileName: 'asset-manifest.json'})
    ]
};