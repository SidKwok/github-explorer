import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';

import App from './App';
import routerMap from './router';

import './assets/fonts/GothamPro/styles.css';
import './assets/fonts/GothamPro-Bold/styles.css';
import './assets/fonts/GothamPro-Medium/styles.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/github-markdown-css/github-markdown.css';
import '../node_modules/animate.css/animate.css';

Vue.use(VueRouter);
// Vue.use(VueResource);
//
// const TOKEN = '7bf2b13020e1ed2278db4bba3f5e7a53102cbc37';
//
// // resource config
// Vue.http.headers.common['Authorization'] = `token ${TOKEN}`;

let router = new VueRouter({
    hashbang: false
});

routerMap(router);

router.start(App, '#root');

router.redirect({
    '/': '/user/SidKwok'
});
