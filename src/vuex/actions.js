import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

// resource config
const TOKEN = '7bf2b13020e1ed2278db4bba3f5e7a53102cbc37';
Vue.http.headers.common['Authorization'] = `token ${TOKEN}`;

const api = (url) => Vue.http.get(url);

export const setUserProfile = ({ dispatch }, username) => {
    return api(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(profile => {
        dispatch('SET_PROFILE', profile);
    });
};
export const setUserRepos = ({ dispatch }, username) => {
    return api('https://api.github.com/search/repositories' +
    `?q=user:${username}&sort=updated`)
    .then(response => response.json().items)
    .then(repos => {
        dispatch('SET_REPOS', repos);
    });
};
