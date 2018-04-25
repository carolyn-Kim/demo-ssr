import { route, GET } from 'awilix-koa';

import { createBundleRenderer } from 'vue-server-renderer';
import LRU from 'lru-cache';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

// 创建数据流
function createRenderer(bundle, template, clientManifest) {
    return createBundleRenderer(
        bundle,
        Object.assign(bundle, {
            template,
            cache: LRU({
                max: 1000,
                maxAge: 1000 * 60 * 15
            }),
            basedir: path.resolve('./dist'),
            runInNewContext: false,
            clientManifest
        })
    );
}

@route('/')
@route('/home')
@route('/about')
@route('/friends')
@route('/sun')
class IndexController {
    @GET()
    async getIndex(ctx, next) {
        // 读取本地index模版
        const template = fs.readFileSync(path.join(__dirname, '..') + '/assets/index.html', 'utf-8');

        // nodejs的一个类jQuery库
        const $ = cheerio.load(template);

        /**
         * serverBundle -所有需要直出的前台代码
         * clientManifest - 打包好的js文件和自己本身的entry-client.js
         */
        const serverBundle = require('../assets/vue-ssr-server-bundle.json');
        const clientManifest = require('../assets/vue-ssr-client-manifest.json');

        const renderer = createRenderer(serverBundle, $.html(), clientManifest);
        const context = { url: ctx.url };

        function createSsrStreamPromise() {
            return new Promise((resolve, reject) => {
                if (!renderer) {
                    return (ctx.body = '请稍后...');
                }
                const ssrStream = renderer.renderToStream(context);
                ctx.status = 200;
                ctx.type = 'html';
                ssrStream.on('error', err => { reject(err); }).pipe(ctx.res);
            });
        }
        await createSsrStreamPromise();
    }
}
export default IndexController;
