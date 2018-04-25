import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

const defaultState = {
    datas: [],
    count: 0,
    about: ''
};

const inBrowser = typeof window !== 'undefined';
if (!inBrowser || process.env.NODE_ENV === 'development') {
    Vue.use(Vuex);
}

const state = (inBrowser && window.__INITIAL_STATE__) || defaultState;

const mutations = {
    DATAS_LIST: (state, datas) => {
        state.datas = datas;
    },
    ABOUT_INFO: (state, about) => {
        state.about = about;
    }
};

export function createStore() {
    return new Vuex.Store({
        state,
        actions,
        mutations,
        getters
    });
}

