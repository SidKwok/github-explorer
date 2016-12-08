import { SET_REPOS } from '../mutation-types';

const state = {
    repos: []
};

const mutations = {
    [SET_REPOS](state, repos) {
        state.repos = repos;
    }
};

export default {
    state,
    mutations
};
