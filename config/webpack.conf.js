const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _mode = process.env.NODE_ENV;
const _modeflag = (_mode === 'production' !== false);
console.log(_modeflag);

module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: { importLoaders: 1, minimize: _modeflag }
                }, 'postcss-loader'
                ]
            })
        }, {
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader'
            }]
        }, {
            test: /\.(png|jpg|gif|eot|woff|woff2|tff|svg|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: _mode === 'production ' ? 'images/[name].[hash:5].[ext]' : 'images/[name].[ext]'
                }
            }]
        }]
    },
    resolve: {
        extensions: ['.vue', '.js', '.es', '.css'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new CopyWebpackPlugin(
            [{
                from: path.join(__dirname, '../' + 'src/webapp/errors/'),
                to: '../views'
            }], {
                copyUnmodified: true,
                ignore: ['*.js', '*.css']
            })
    ]

};
