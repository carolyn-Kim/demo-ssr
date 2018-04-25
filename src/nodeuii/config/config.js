// 应用配置文件
import _ from 'lodash';
import path from 'path';

let config = {
    // 模版文件所在的目录
    'viewDir': path.join(__dirname, '..', 'views'),
    // 静态文件所在的目录
    'staticDir': path.join(__dirname, '..', 'assets'),
    'env': process.env.NODE_ENV // env: development or production
};

// 开发环境下
if (process.env.NODE_ENV === 'development') {
    // 本地端口号
    const localConfig = {
        port: 8081
    };
    config = _.extend(config, localConfig);
}

// 上线环境下
if (process.env.NODE_ENV === 'production') {
    // 上线端口号
    const proConfig = {
        port: 8081
    };
    config = _.extend(config, proConfig);
}

export default config;

