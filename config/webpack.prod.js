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

const config = merge(conf, {
    entry: rootPath + '/src/webapp/entry-client.js',
    output: {
        path: path.resolve(__dirname, '../dist/assets/'),
        publicPath: '/',
        filename: 'scripts/[name].[hash:5].bundle.js'
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin('styles/[name].[hash:5].css'),
        // 多entry提取公用代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'scripts/[name].js',
            minChunks: 2
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minify: {
                collapseWhitespace: true
            },
            filename: 'scripts/[name].js',
            minChunks: Infinity,
            chunks: ['common']
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                // 删除所有的 `console` 语
                drop_console: true,
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            },
            sourceMap: false
        }),
        // 这是将服务器的整个输出
        // 构建为单个 JSON 文件的插件。
        // 默认文件名为 `vue-ssr-server-bundle.json`
        new VueSSRClientPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/webapp/index.template.html',
            inject: false,
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
    ]
});
module.exports = config;
