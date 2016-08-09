import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    profile: {},
    repos: []
};

const mutations = {
    SET_PROFILE (state, profile) {
        state.profile = profile;
    },
    SET_REPOS (state, repos) {
        state.repos = repos;
    }
};

export default new Vuex.Store({
    state,
    mutations
});
