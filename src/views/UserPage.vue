<template lang="html">
    <div id="user-page" class="animated" transition="zoom" style="animation-duration: .5s;">
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
        <a v-link="`/user/${this.profile.login}/repos`"
            class="view-all-btn"
        >
            VIEW ALL REPOS
        </a>
    </div>
</template>

<script>
import Profile from '../components/Profile';
import RepoItem from '../components/RepoItem';

import { setUserProfile } from '../vuex/actions';
import { setUserRepos } from '../vuex/actions';
import { getProfile } from '../vuex/getters';
import { getRepos } from '../vuex/getters';

export default {
    vuex: {
        actions: {
            setUserProfile,
            setUserRepos,
        },
        getters: {
            getProfile,
            getRepos
        }
    },
    computed: {
        profile() {
            return this.getProfile;
        },
        repos() {
            if (this.getRepos.length >= 10) {
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
    route: {
        data() {
            const username = this.$route.params.username;
            if (username !== this.profile.login) {
                this.loadUser(username);
            }
            this.$dispatch('MOUNT_HEADER_CHANGE');
        }
    },
    methods: {
        loadUser(username) {
            Promise.all([
                this.setUserProfile(username),
                this.setUserRepos(username)
            ]).then(() => {
                this.$dispatch('TRIGGER_LOAD_ANIMATION_DONE');
            });
            this.$dispatch('TRIGGER_LOAD_ANIMATION');
        },
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
