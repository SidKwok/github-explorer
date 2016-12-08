import axios from 'axios';

// resource config
const TOKEN = '7bf2b13020e1ed2278db4bba3f5e7a53102cbc37';
const option = {
    headers: {
        'Authorization': `token ${TOKEN}`
    }
};

const api = (url) => axios.get(url. option);

export const setUserProfile = ({ commit }, username) => {
    return api(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(profile => {
        commit('SET_PROFILE', profile);
    });
};
export const setUserRepos = ({ commit }, username) => {
    return api('https://api.github.com/search/repositories' +
    `?q=user:${username}&sort=updated`)
    .then(response => response.json().items)
    .then(repos => {
        commit('SET_REPOS', repos);
    });
};

// NavMenu management
export const fullNavMenu = ({ commit }) => {
    commit('FULL_NAV_MENU');
};
export const openNavMenu = ({ commit }) => {
    commit('OPEN_NAV_MENU');
};
export const closeNavMenu = ({ commit }) => {
    commit('CLOSE_NAV_MENU');
};
export const toggleNavMenu = ({ commit }) => {
    commit('TOGGLE_NAV_MENU');
};
export const triggerLoadAnimation = ({ commit }) => {
    commit('TRIGGER_LOAD_ANIMATION');
};
export const triggerLoadAnimationDone = ({ commit }) => {
    dispatch('TRIGGER_LOAD_ANIMATION_DONE');
    setTimeout(() => {
        commit('HIDE_LOAD_ANIMATION');
    }, 600);
};
export const requestFailed = ({ commit }) => {
    commit('REQUEST_FAILED');
};
