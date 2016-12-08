import Vue from 'vue';
import VueRouter from 'vue-router';

import UserPage from './views/UserPage';
import RepoList from './views/RepoList';
import RepoDetail from './views/RepoDetail';
import NotFound from './views/NotFound';
import App from './App';

import './assets/fonts/GothamPro/styles.css';
import './assets/fonts/GothamPro-Bold/styles.css';
import './assets/fonts/GothamPro-Medium/styles.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/github-markdown-css/github-markdown.css';
import '../node_modules/animate.css/animate.css';

Vue.use(VueRouter);
let router = new VueRouter({
    history: true
});
router.map({
    '/user/:username': {
        name: 'USER_DETAIL',
        component: UserPage
    },
    '/user/:username/repos': {
        name: 'USER_REPO_LIST',
        component: RepoList
    },
    '/user/:username/repos/:repoName': {
        name: 'REPO_DETAIL',
        component: RepoDetail
    },
    '*': {
        name: 'NOT_FOUND',
        component: NotFound
    }
});

router.redirect({
    '*': '/user/SidKwok',
});

router.start(App, '#root');
