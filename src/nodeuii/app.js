'use strict';
import Koa from 'koa';
import serve from 'koa-static';
import log4js from 'log4js';
import config from './config/config';
import errorHandler from './middleware/errorHandler';
import path from 'path';
import render from 'koa-swig';
import co from 'co';

const { createContainer, Lifetime } = require('awilix');
const { loadControllers, scopePerRequest } = require('awilix-koa');

const app = new Koa();

// 创建IOC的容器
const container = createContainer();

// 每一次的请求都是一个 new model
app.use(scopePerRequest(container));

// 装载所有的models 并将services代码注入到controllers
container.loadModules([path.join(__dirname, '/services/*.js')], {
    formatName: 'camelCase',
    resolverOptions: {
        lifetime: Lifetime.SCOPED
    }
});

// 日志信息
log4js.configure({
    appenders: { cheese: { type: 'file', filename: './logs/yd.log' }},
    categories: { default: { appenders: ['cheese'], level: 'error' }}
});
const logger = log4js.getLogger('cheese');

// 处理错误句柄
errorHandler.error(app, logger);
// 注册所有的路由
app.use(loadControllers(path.join(__dirname, '/controllers/*.js'), { cwd: __dirname }));

// 热更新
if (config.env === 'development') {
    const webpack = require('webpack');
    const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
    const devConfig = require('../config/webpack.dev');

    const compile = webpack(devConfig);
    app.use(devMiddleware(compile, {
        // display no info to console (only warnings and errors)
        noInfo: false,

        // display nothing to the console
        quiet: false,

        // switch into lazy mode
        // that means no watching, but recompilation on every request
        lazy: false,

        // watch options (only lazy: false)
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },

        // public path to bind the middleware to
        // use the same as in webpack
        publicPath: '/',

        // custom headers
        headers: { 'Access-Control-Allow-Origin': '*' },

        // options for formating the statistics
        stats: {
            colors: true
        }
    }));
    app.use(hotMiddleware(compile, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));
}

// 渲染容错页面
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}));

// 静态资源文件
app.use(serve(config.staticDir));

app.listen(config.port, () => {
    // console.log(config);
    console.log(`server is listening on port ${config.port}`);
});

module.exports = app;
