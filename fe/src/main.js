import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import UserPage from './views/UserPage';
import RepoList from './views/RepoList';
import RepoDetail from './views/RepoDetail';
import NotFound from './views/NotFound';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'APP',
            component: App,
            children: [
                {
                    path: 'user/:username',
                    name: 'USER_DETAIL',
                    component: UserPage
                },
                {
                    path: 'user/:username/repos',
                    name: 'USER_REPO_LIST',
                    component: RepoList
                },
                {
                    path: 'user/:username/repos/:reponame',
                    name: 'REPO_DETAIL',
                    component: RepoDetail
                },
                {
                    path: '*',
                    // name: 'NOT_FOUND',
                    // component: NotFound
                    redirect: {
                        name: 'USER_DETAIL',
                        params: {
                            username: 'SidKwok'
                        }
                    }
                }
            ]
        }
    ]
});

new Vue({
    router
}).$mount('#root');
