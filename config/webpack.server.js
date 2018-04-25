const path = require('path');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const rootPath = path.join(__dirname, '..');

module.exports = {
    target: 'node',
    entry: rootPath + '/src/webapp/entry-server.js',
    devtool: false,
    output: {
        path: rootPath + '/dist/assets/',
        publicPath: '/',
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader'
            }]
        }, {
            test: /\.(png|jpg|gif|eot|woff|woff2|tff|svg|otf)$/,
            loader: 'file-loader?name=images/[name].[ext]'
        }]
    },
    resolve: {
        extensions: ['.vue', '.js', '.es', '.css'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: [
        new VueSSRServerPlugin()
    ]
};

