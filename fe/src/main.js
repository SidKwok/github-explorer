import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App';
import routerMap from './router';

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

routerMap(router);

router.redirect({
    '*': '/user/SidKwok',
});

router.start(App, '#root');
