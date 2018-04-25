import request from 'axios';

request.defaults.baseURL = 'http://localhost:8081';

export const getDatas = ({ commit, state }) => {
    return request.get('data/getinfos').then((response) => {
        if (response.statusText === 'OK') {
            commit('DATAS_LIST', response.data);
        }
    }).catch((error) => {
        console.log(error);
    });
};

export const getAboutInfo = ({ commit, state }) => {
    return request.get('getabout').then((response) => {
        if (response.statusText === 'OK') {
            commit('ABOUT_INFO', response.data);
        }
    }).catch((error) => {
        console.log(error);
    });
};
