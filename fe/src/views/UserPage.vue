<template lang="html">
    <div id="user-page" class="animated" style="animation-duration: .5s;">
        <profile
            :username="profile.login"
            :profile="profile"
        ></profile>
        <div class="repo-list">
            <div class="repo-list-header">POPULAR REPOSITORIES</div>
            <div>
                <repo-item
                    v-for="repo in repos"
                    :repo="repo"
                    class="animated"
                    transition="lineup"
                    stagger="100"
                    style="animation-duration: .3s;"
                ></repo-item>
            </div>
        </div>
        <router-link class="view-all-btn"
            :to="{
                name: 'USER_REPO_LIST'
            }">VIEW REPOSITORIES</router-link>
    </div>
</template>

<script>
import Profile from '../components/Profile';
import RepoItem from '../components/RepoItem';
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            profile: 'getProfile',
            getRepos: 'getRepos'
        }),
        repos() {
            if (this.length >= 10) {
                return this.getRepos.slice(0, 10);
            } else {
                return this.getRepos;
            }
        }
    },
    components: {
        Profile,
        RepoItem
    },
    mounted() {
        this.$nextTick(this.fetchData);
    },
    methods: {
        ...mapActions([
            'setUserProfile',
            'setUserRepos',
            'triggerLoadAnimation',
            'triggerLoadAnimationDone',
            'requestFailed'
        ]),
        fetchData() {
            const {username} = this.$route.params;
            if (username !== this.profile.login) {
                this.loadUser(username);
            }
        },
        loadUser(username) {
            Promise.all([
                this.setUserProfile(username),
                this.setUserRepos(username)
            ]).then(() => {
                this.triggerLoadAnimationDone();
            }, () => {
                this.requestFailed();
            });
            this.triggerLoadAnimation();
        }
    },
    transitions: {
        'zoom': {
            enterClass: 'zoomIn',
            leaveClass: 'zoomOut'
        },
        'lineup': {
            enterClass: 'fadeInUp',
            leaveClass: 'fadeOutRight'
        }
    }

}
</script>

<style lang="less">
@headerHeight: 60px;

#user-page {
    background-color: #f5f5f5;
    padding-bottom: 20px;
}

.repo-list {
    padding: 15px;
    min-height: 100vh;

    .repo-list-header {
        color: #aeb6c0;
        font-family: GothamPro;
        font-size: 13px;
        letter-spacing: 0.6px;
        margin-top: 15px;
        margin-bottom: 10px;
    }
}

.view-all-btn {
    display: block;
    width: 165px;
    height: 40px;
    margin: 0 auto;
    line-height: 40px;
    border-radius: 8px;
    border: solid 0.5px #aeb6c0;
    font-family: GothamPro-Bold;
    font-size: 14px;
    letter-spacing: 0.5px;
    text-align: center;
    color: #8f9aa8;
}
</style>
