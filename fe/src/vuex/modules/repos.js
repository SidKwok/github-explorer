import api from '../../api';
import * as types from '../mutation-types';

const state = {
    repos: []
};

const getters = {
    getRepos: state => state.repos
};

const actions = {
    setUserRepos({ commit }, username) {
        commit(types.INIT_REPOS);
        return api(
            'https://api.github.com/search/repositories' +`?q=user:${username}&sort=updated`
        ).then(data => data.items)
        .then(repos => {
            commit(types.SET_REPOS, {repos});
        })
    }
};

const mutations = {
    [types.INIT_REPOS](state) {
        state.repos = [];
    },
    [types.SET_REPOS](state, {repos}) {
        state.repos = repos;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
