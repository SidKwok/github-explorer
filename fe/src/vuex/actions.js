import axios from 'axios';

const TOKEN = '7bf2b13020e1ed2278db4bba3f5e7a53102cbc37';
const option = {
    headers: {
        'Authorization': `token ${TOKEN}`
    }
};
const api = url =>
        axios.get(url, option)
            .then(response => response.data);

export { api };

export const setUserProfile = ({ dispatch }, username) =>
    api(`https://api.github.com/users/${username}`)
    .then(profile => {
        dispatch('SET_PROFILE', profile);
    });
export const setUserRepos = ({ dispatch }, username) =>
    api('https://api.github.com/search/repositories' +
    `?q=user:${username}&sort=updated`)
    .then(data => data.items)
    .then(repos => {
        dispatch('SET_REPOS', repos);
    });

// NavMenu management
export const fullNavMenu = ({ dispatch }) => {
    dispatch('FULL_NAV_MENU');
};
export const openNavMenu = ({ dispatch }) => {
    dispatch('OPEN_NAV_MENU');
};
export const closeNavMenu = ({ dispatch }) => {
    dispatch('CLOSE_NAV_MENU');
};
export const toggleNavMenu = ({ dispatch }) => {
    dispatch('TOGGLE_NAV_MENU');
};
export const triggerLoadAnimation = ({ dispatch }) => {
    dispatch('TRIGGER_LOAD_ANIMATION');
};
export const triggerLoadAnimationDone = ({ dispatch }) => {
    dispatch('TRIGGER_LOAD_ANIMATION_DONE');
    setTimeout(() => {
        dispatch('HIDE_LOAD_ANIMATION');
    }, 600);
};
export const requestFailed = ({ dispatch }) => {
    dispatch('REQUEST_FAILED');
};
