import UserPage from './views/UserPage';
import RepoList from './views/RepoList';
import RepoDetail from './views/RepoDetail';
import NotFound from './views/NotFound';

export default (router) => {
    router.map({
        '/user/:username': {
            name: 'USER_DETAIL',
            component: UserPage
            // component(resolve) {
            //     require(['./views/UserPage'], resolve);
            // }
        },
        '/user/:username/repos': {
            name: 'USER_REPO_LIST',
            component: RepoList
            // component(resolve) {
            //     require(['./views/RepoList'], resolve);
            // }
        },
        '/user/:username/repos/:repoName': {
            name: 'REPO_DETAIL',
            component: RepoDetail
            // component(resolve) {
            //     require(['./views/RepoDetail'], resolve);
            // }
        },
        '*': {
            name: 'NOT_FOUND',
            component: NotFound
            // component(resolve) {
            //     require(['./views/NotFound'], resolve);
            // }
        }
    });
};
