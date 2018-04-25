/**
 *@Description 本地环境Webpack配置项
 */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const conf = require('./webpack.conf');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const rootPath = path.join(__dirname, '..');
const webpackHotMiddlewareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';

const config = merge(conf, {
    entry: [webpackHotMiddlewareConfig, rootPath + '/src/webapp/entry-client.js'],
    output: {
        path: path.resolve(__dirname, '../dist/assets/'),
        publicPath: '/',
        filename: 'scripts/[name].bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('styles/[name].css'),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            filename: 'scripts/[name].js',
            minChunks: Infinity
        }),
        // 这是将服务器的整个输出
        // 构建为单个 JSON 文件的插件。
        // 默认文件名为 `vue-ssr-server-bundle.json`
        new VueSSRClientPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/webapp/index.template.html',
            inject: false
        })
    ]
});
module.exports = config;

