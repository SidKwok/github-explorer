import {
    TRIGGER_LOAD_ANIMATION,
    TRIGGER_LOAD_ANIMATION_DONE,
    HIDE_LOAD_ANIMATION,
    REQUEST_FAILED
} from '../mutation-types';

const state = {
    showLoading: false,
    doneLoading: false,
    loadFailed: false
};

const mutations = {
    [TRIGGER_LOAD_ANIMATION](state) {
        state.showLoading = !state.loadFailed
    },
    [TRIGGER_LOAD_ANIMATION_DONE](state) {
        state.loadFailed = false;
        state.doneLoading = true;
    },
    [HIDE_LOAD_ANIMATION](state) {
        state.showLoading = false;
        state.loadFailed = false;
        state.doneLoading = false;
    },
    [REQUEST_FAILED](state) {
        state.loadFailed = true;
    }
};

export default {
    state,
    mutations
};
