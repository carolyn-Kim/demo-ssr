import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './vuex/store';
import { sync } from 'vuex-router-sync';

export function createApp(ssrContext) {
    // 创建router实例
    const router = createRouter();
    // 创建store实例
    const store = createStore();

    // 同步路由状态到store
    sync(store, router);

    // 注入router和store
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });

    // 暴露根Vue实例 和 暴露一个 router 实例 和暴露一个 store 实例
    return { app, router, store };
}
