const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const DIST_STATIC_JS_PATH = 
        path.resolve(__dirname,
            process.env.DIST_PATH 
                ? "../"+process.env.DIST_PATH+"/static/js"
                : '../dist/static/js'
        ); 

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: DIST_STATIC_JS_PATH
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