import { createApp } from './app.js';

const { app, router } = createApp();

// 路由解析完成的时候，将 app 挂载到 #app 标签下
router.onReady(() => {
    app.$mount('#app');
});
