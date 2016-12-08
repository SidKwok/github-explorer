import { SET_PROFILE } from '../mutation-types';

const state = {
    type: '',
    login: '',
    avatar_url: '',
    gravatar_id: '',
    created_at: '',
    html_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    following: 0,
    followers: 0,
    bio: '',
    hireable: null,
    events_url: '',
    email: '',
    id: 0,
    location: null,
    blog: '',
    company: '',
    public_repos: 0,
    name: '',
    organizations_url: '',
    public_gists: 0,
    received_events_url: '',
    repos_url: '',
    site_admin: false,
    starred_url: '',
    subscriptions_url: '',
    updated_at: '',
    url: ''
};

const mutations = {
    [SET_PROFILE](state, profile) {
        state.type = profile.type;
        state.login = profile.login;
        state.avatar_url = profile.avatar_url;
        state.gravatar_id = profile.gravatar_id;
        state.created_at = profile.created_at;
        state.html_url = profile.html_url;
        state.followers_url = profile.followers_url;
        state.following_url = profile.following_url;
        state.gists_url = profile.gists_url;
        state.following = profile.following;
        state.followers = profile.followers;
        state.bio = profile.bio;
        state.hireable = profile.hireable;
        state.events_url = profile.events_url;
        state.email = profile.email;
        state.id = profile.id;
        state.location = profile.location;
        state.blog = profile.blog;
        state.company = profile.company;
        state.public_repos = profile.public_repos;
        state.name = profile.name;
        state.organizations_url = profile.organizations_url;
        state.public_gists = profile.public_gists;
        state.received_events_url = profile.received_events_url;
        state.repos_url = profile.repos_url;
        state.site_admin = profile.site_admin;
        state.starred_url = profile.starred_url;
        state.subscriptions_url = profile.subscriptions_url;
        state.updated_at = profile.updated_at;
        state.url = profile.url;
    }
};

export default {
    state,
    mutations
};
