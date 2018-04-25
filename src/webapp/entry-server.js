import { createApp } from './app.js';

// context是一个包含路由信息的对象
export default context => {
    // 因为这边 router.onReady 是异步的，所以返回一个 Promise
    // 确保路由或组件准备就绪
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();
        router.push(context.url);
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                reject({ code: 404 });
            }

            // 在服务端渲染时检查匹配到的路由组件，看他是否有asyncData方法，如果有就将store和router传入调用
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        router
                    });
                }
            })).then(() => {
                // 将store的状态同步到客户端
                context.state = store.state;
                resolve(app);
            }).catch(reject);
        }, reject);
    });
};

