import {
    FULL_NAV_MENU,
    OPEN_NAV_MENU,
    CLOSE_NAV_MENU,
    TOGGLE_NAV_MENU
} from '../mutation-types';

const state = {
    full: false,
    open: false
};

const mutations = {
    [FULL_NAV_MENU](state) {
        state.full = true;
    },
    [OPEN_NAV_MENU](state) {
        state.full = false;
        state.open = true;
    },
    [CLOSE_NAV_MENU](state) {
        state.full = false;
        state.open = false;
    },
    [TOGGLE_NAV_MENU](state) {
        state.open = !state.open;
    }
};

export default {
    state,
    mutations
};
