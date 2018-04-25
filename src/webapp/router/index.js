import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Friend from '../components/Friend.vue';
import Sun from '../components/Sun.vue';

Vue.use(VueRouter);

export function createRouter() {
    return new VueRouter({
        mode: 'history',
        base: __dirname,
        routes: [
            { path: '/', component: Home },
            {
                path: '/home',
                component: Home
            },
            {
                path: '/about',
                component: About
            },
            {
                path: '/friends',
                component: Friend
            },
            {
                path: '/sun',
                component: Sun
            }
        ]
    });
}
