import Vue from 'vue';

import App from './App';
import router from './router';

import './assets/fonts/GothamPro/styles.css';
import './assets/fonts/GothamPro-Bold/styles.css';
import './assets/fonts/GothamPro-Medium/styles.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/github-markdown-css/github-markdown.css';
import '../node_modules/animate.css/animate.css';

router.start(App, '#root');
