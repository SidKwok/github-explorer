import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex);

const state = {
    profile: {},
    repos: [],
    // application states
    navMenu: {
        full: false,
        open: false,
    },
    header: {
        showLoading: false,
        doneLoading: false,
        loadFailed: false
    }

};

const mutations = {
    SET_PROFILE (state, profile) {
        state.profile = profile;
    },
    SET_REPOS (state, repos) {
        state.repos = repos;
    },
    // application states management
    FULL_NAV_MENU (state) {
        state.navMenu.full = true;
    },
    OPEN_NAV_MENU (state) {
        state.navMenu.full = false;
        state.navMenu.open = true;
    },
    CLOSE_NAV_MENU (state) {
        state.navMenu.full = false;
        state.navMenu.open = false;
    },
    TOGGLE_NAV_MENU (state) {
        state.navMenu.open = !state.navMenu.open;
    },
    TRIGGER_LOAD_ANIMATION (state) {
        state.header.showLoading = !state.header.loadFailed
    },
    TRIGGER_LOAD_ANIMATION_DONE (state) {
        state.header.loadFailed = false;
        state.header.doneLoading = true;
    },
    HIDE_LOAD_ANIMATION (state) {
        state.header.showLoading = false;
        state.header.loadFailed = false;
        state.header.doneLoading = false;
    },
    REQUEST_FAILED (state) {
        state.header.loadFailed = true;
    }
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});
