<template lang="html">
    <div id="repo-list-page"
        class="transition-item bounceInLeft animated"
        :style="{ 'top': offsetTop }"
        style="animation-duration: .8s;"
        transition="zoom"
    >
        <div id="search-wrapper" ref="searchwrapper">
            <search-input
                placeholder="Find a repository..."
                v-model="searchText"
                buttonText="SEARCH"
                @search="search"
                class="animated"
                transition="lineup"
            ></search-input>
        </div>
        <div id="scroll-wrapper" ref="scrollwrapper" @scroll="scroll">
            <div id="repo-list">
                <div v-if="!repos.length && isSearching"
                    class="empty-data"
                >
                    :-( Sad... No result found!
                </div>
                <template v-else>
                    <list-transition>
                        <repo-item
                            v-for="(repo, index) in repos"
                            :repo="repo"
                            :key="repo.full_name"
                            :data-index="index"
                        ></repo-item>
                    </list-transition>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import SearchInput from 'components/SearchInput';
import RepoItem from 'components/RepoItem';
import ListTransition from 'components/ListTransition';
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            searchText: '',
            searchRepos: [],
            complete: false,
            showSearch: false,
            offsetTop: 0,
            wait: false
        }
    },
    computed: {
        ...mapGetters({
            profile: 'getProfile',
            getRepos: 'getRepos'
        }),
        repos() {
            if (this.searchRepos.length) {
                return this.searchRepos;
            } else {
                return this.getRepos;
            }
        }
    },
    watch: {
        searchText(val) {
            if (!val) this.searchRepos = [];
        },
        $route() {
            const username = this.$route.params.username;
            if (username !== this.profile.login) {
                this.loadUser(username);
            }
        }
    },
    components: {
        SearchInput,
        RepoItem,
        ListTransition
    },
    methods: {
        ...mapActions([
            'setUserProfile',
            'setUserRepos',
            'triggerLoadAnimation',
            'triggerLoadAnimationDone',
            'requestFailed'
        ]),
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
        },
        scroll() {
            let lastScrollTop = this.$refs.scrollwrapper.scrollTop;
            if (!this.wait) {
                window.requestAnimationFrame(() => {
                    if (lastScrollTop > 0) {
                        this.$refs.searchwrapper.classList.add('shadow');
                    } else {
                        this.$refs.searchwrapper.classList.remove('shadow');
                    }
                    this.wait = false;
                });
                this.wait = true;
            }
        },
        search() {
            const keyword = this.searchText;
            this.$refs.scrollwrapper.scrollTop = 0;
            this.searchRepos = this.getRepos.filter(e => e.name.includes(keyword));
        }
    }
}
</script>

<style lang="less">
#repo-list-page {
    padding-top: 25px;
    background-color: #f5f5f5;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;

    #search-wrapper {
        position: absolute;
        top: 20px;
        left: 15px;
        right: 15px;
        z-index: 2;
        border-radius: 8px;
        transform: translate3d(0, 0, 0);
        transition: box-shadow 0.3s, transform 0.3s;

        &.shadow {
            box-shadow: 0 0px 20px rgba(0, 0, 0, 0.3);
            transform: translate3d(0, -12px, 0);
        }
    }

    #scroll-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-y: scroll; /* has to be scroll, not auto */
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        z-index: 1;
    }

    #search-input input {
        border: solid 0.5px #e5e5e5;
    }

    #repo-list {
        margin-top: 75px;
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 15px;
        min-height: 100vh;
    }

    #load-more {
        width: 165px;
        height: 40px;
        margin: 30px auto;
        line-height: 40px;
        border-radius: 8px;
        border: solid 0.5px #aeb6c0;
        font-family: GothamPro-Bold;
        font-size: 14px;
        letter-spacing: 0.5px;
        text-align: center;
        color: #8f9aa8;
    }

    &.transition-appear {
        transform: scale(0);
        opacity: 0.01;
        transition: transform 0.3s cubic-bezier(0.7, 0, 0.25, 1),
                    box-shadow 0.3s cubic-bezier(0.7, 0, 0.25, 1);
        height: 100vh;
    }

    &.transition-appear.transition-appear-active {
        transform: scale(1);
        opacity: 1;
    }

    /* Router Animation */
    @-webkit-keyframes bounceInLeft {
        from,
        60%,
        75%,
        90%,
        to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        0% {
            opacity: 0;
            -webkit-transform: translate3d(-3000px, 0, 0);
            transform: translate3d(-3000px, 0, 0);
        }

        60% {
            opacity: 1;
            -webkit-transform: translate3d(25px, 0, 0);
            transform: translate3d(25px, 0, 0);
        }

        75% {
            -webkit-transform: translate3d(-10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
        }

        90% {
            -webkit-transform: translate3d(5px, 0, 0);
            transform: translate3d(5px, 0, 0);
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes bounceInLeft {
        from,
        60%,
        75%,
        90%,
        to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        0% {
            opacity: 0;
            -webkit-transform: translate3d(-3000px, 0, 0);
            transform: translate3d(-3000px, 0, 0);
        }

        60% {
            opacity: 1;
            -webkit-transform: translate3d(25px, 0, 0);
            transform: translate3d(25px, 0, 0);
        }

        75% {
            -webkit-transform: translate3d(-10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
        }

        90% {
            -webkit-transform: translate3d(5px, 0, 0);
            transform: translate3d(5px, 0, 0);
        }

        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    .bounceInLeft {
    -webkit-animation-name: bounceInLeft;
    animation-name: bounceInLeft;
    }
}
</style>
