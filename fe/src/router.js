import UserPage from './views/UserPage';
import RepoList from './views/RepoList';
import RepoDetail from './views/RepoDetail';
import NotFound from './views/NotFound';

export default (router) => {
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
};
