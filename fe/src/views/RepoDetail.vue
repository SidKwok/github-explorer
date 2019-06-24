<template lang="html">
    <div id="repo-detail"
        class="transition-item animated"
        transition="zoom"
        :style="{'transform': transStyle}"
        style="animation-duration: .8s;"
    >
        <div class="animated bounceInRight">
            <repo-content :repo="repo"></repo-content>
        </div>
        <div id="repo-tabs-wrapper" ref="tabwrapper">
            <div id="repo-tabs" class="animated bounceInRight">
                <div v-for="tab in TABS"
                    @click="switchTab(tab)"
                    class="repo-tab-item"
                    :class="{ 'selected':  (activeTab === tab.key) }"
                >
                    {{ tab.value }}
                </div>
            </div>
        </div>
        <div class="offline-msg" v-if="loadFailed">
            You are offline!
            <div @click="getProfile" class="blue-link">Try again</div>
        </div>
        <div ref="tabcontent" id="repo-tab-content">
            <div id="readme"
                class="repo-content-item markdown-body"
                :class="{ 'show': (activeTab === 'readme') }"
            >
                <vue-markdown :source="readme"></vue-markdown>
                <div class="empty-data" v-if="!readme">No data</div>
            </div>
            <div id="files"
                class="repo-content-item"
                :class="{ 'show': (activeTab === 'files') }"
            >
                <template v-for="content in contents">
                    <div class="file-item">
                        <div class="file-icon">
                            <i class="fa fa-file-text-o" v-if="content.type === 'file'"></i>
                            <i class="fa fa-folder" v-else></i>
                        </div>
                        <div class="file-info">
                          <div class="file-name">{{ content.name }}</div>
                          <div class="file-date">
                              {{ content.size | transToSize }}
                          </div>
                        </div>
                    </div>
                </template>
                <div class="empty-data" v-if="!contents.length">No data</div>
            </div>
            <div id="contributors"
                class="repo-content-item"
                :class="{ 'show': (activeTab === 'contributors') }"
            >
                <div class="contrib-item"
                    v-for="contrib in contribs"
                >
                    <div class="contrib-avatar"
                        :style="{'backgroundImage': `url('${contrib.avatar_url}')`}"
                    ></div>
                    <div class="contrib-info">
                        <div class="contrib-name">{{contrib.login}}</div>
                        <div class="contrib-value">{{contrib.contributions}} {{' '}}
                            contribution{{contrib.contributions === 1 ? '' : 's'}}
                        </div>
                    </div>
                </div>
                <div class="empty-data" v-if="!contribs.length">No data</div>
            </div>
            <div id="languages"
                class="repo-content-item"
                :class="{ 'show': (activeTab === 'languages') }"
            >
                <div class="lang-item" v-for="language in languages">
                    <div class="lang-color"
                        :style="{ backgroundColor: getColor(language.name) }"
                    ></div>
                    <div class="lang-info">
                        <div class="lang-name">{{language.name}}</div>
                        <div class="lang-value">{{language.value}}%</div>
                    </div>
                </div>
                <div class="empty-data" v-if="!languages.length">No data</div>
            </div>
        </div>
    </div>
</template>

<script>
import RepoContent from 'components/RepoContent';
import VueMarkdown from 'vue-markdown';
import COLORS from 'assets/colors.json';
import api from '../api';

import { Base64 } from 'js-base64';
import filesize from 'filesize';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            activeTab: '',
            repo: {},
            readme: '',
            contribs: [],
            contents: [],
            languages: [],
            doTransform: false,
            offsetTop: 0,
            loadFailed: false,
            startPosition: {
                top: 0,
                left: 0,
                right: 0,
            },
            TABS: [
                { key: 'readme', value: 'README' },
                { key: 'files', value: 'FILES & DIRECTORIES' },
                { key: 'contributors', value: 'CONTRIBUTORS' },
                { key: 'languages', value: 'LANGUAGES' },
            ],
            scrollDom: null,
            wait: false,
        }
    },
    computed: {
        transStyle() {
            return this.doTransform ? `translate3d(0, ${this.startPosition.top + offsetTop - 60}px, 0)` : '';
        }
    },
    components: {
        RepoContent,
        VueMarkdown
    },
    mounted() {
        this.$nextTick(() => {
            this.getProfile();
            this.scrollDom = document.getElementById('scroll-section');
            this.scrollDom.addEventListener('scroll', this.scrollEvent, false);
        });
    },
    destroyed() {
        this.$nextTick(() => {
            this.scrollDom.removeEventListener('scroll', this.scrollEvent, false);
        });
    },
    watch: {
        $route: 'getProfile'
    },
    methods: {
        ...mapActions([
            'triggerLoadAnimation',
            'triggerLoadAnimationDone',
            'requestFailed'
        ]),
        getProfile() {
            let args = [this.$route.params.username, this.$route.params.reponame];
            Promise.all([
                this.getRepoDetail(...args),
                this.getRepoReadme(...args),
                this.getRepoContents(...args),
                this.getRepoContribs(...args),
                this.getRepoLanguages(...args)
            ]).then(() => {
                this.triggerLoadAnimationDone();
                this.loadFailed = false;
                this.activeTab = 'readme';
                this.refreshContentHeight(this.TABS[0]);
            }).catch(() => {
                this.requestFailed();
            });
            this.triggerLoadAnimation();
        },
        getRepoDetail(username, reponame) {
            return api(`https://api.github.com/repos/${username}/${reponame}`)
            .then(repo => {
                this.repo = repo;
            });
        },
        getRepoReadme(username, reponame) {
            return api(`https://api.github.com/repos/${username}/${reponame}/readme`)
            .then(data => data.content || '')
            .then(readme => {
                this.readme = Base64.decode(readme);
            });
        },
        getRepoContents(username, reponame) {
            return api(`https://api.github.com/repos/${username}/${reponame}/contents`)
            .then(contents => {
                this.contents = contents.sort((a, b) => a.type.localeCompare(b.type));
            });
        },
        getRepoContribs(username, reponame) {
            return api(`https://api.github.com/repos/${username}/${reponame}/contributors`)
            .then(contribs => {
                this.contribs = contribs;
            });
        },
        getRepoLanguages(username, reponame) {
            return api(`https://api.github.com/repos/${username}/${reponame}/languages`)
            .then(languages => {
                const newLanguages = Object.keys(languages)
                    .map(key => ({ name: key, value: languages[key] }));
                let total = 0;
                if (newLanguages.length === 0) {
                    total = 0;
                } else if (newLanguages.length === 1) {
                    total = newLanguages[0].value;
                } else {
                    total = newLanguages.reduce((a, b) => ({ value: a.value + b.value })).value;
                }
                this.languages =  newLanguages.map(a => ({
                    name: a.name,
                    value: Math.round(1000 * a.value / total) / 10,
                }));
            });
        },
        onTransitionWillStart(data) {
            return new Promise(resolve => {
                if (!data || !data.detailPageData) return;
                this.startPosition = data.detailPageData.startPosition;
                this.repoDetailData = data.detailPageData.repoDetailData;
                this.offsetTop = data.scrollTop;
                this.doTransform = true;
                resolve()
            });
        },
        onTransitionDidEnd() {
            this.getProfile();
        },
        transitionManuallyStart() {
            return new Promise(resolve => {
                this.startPosition.top = 60;
                this.doTransform = true;
                resolve();
            });
        },
        transitionManuallyStop() {
            this.doTransform = false;
        },
        switchTab(tab) {
            this.activeTab = tab.key;
            this.refreshContentHeight(tab);
        },
        refreshContentHeight(tab) {
            const selectedTab = document.getElementById(tab.key);
            this.$refs.tabcontent.style.height = `${selectedTab.offsetHeight + 30}px`;
        },
        getColor(language) {
            return COLORS[language].color;
        },
        scrollEvent() {
            const {top} = this.$refs.tabwrapper.parentElement.getBoundingClientRect();
            if (!this.wait) {
                window.requestAnimationFrame(() => {
                    if (top < -60) {
                        this.$refs.tabwrapper.classList.add('fixed');
                    } else {
                        this.$refs.tabwrapper.classList.remove('fixed');
                    }
                    this.wait = false;
                });
                this.wait = true;
            }
        }
    },
    filters: {
        transToSize(size) {
            if (!size) return '';
            return filesize(size);
        },
    }
}
</script>

<style lang="less">
@tabHeight: 50px;

#repo-detail {
    min-height: 100vh;
    overflow: hidden;
    background-color: #f5f5f5;

    &.transition-appear {
        transition: transform 0.3s,
        top 0.3s,
        left 0.3s,
        right 0.3s,
        width 0.3s,
        bottom 0.3s,
        width 0.3s,
        height 0.3s;
    }

    &.transition-appear.transition-appear-active {
    }
}

.tab-wrapper-transition-group {
    height: @tabHeight;
    display: block;
}

#repo-tabs-wrapper {
    height: @tabHeight;
    overflow: hidden;
    border-bottom: solid 0.5px #e5e5e5;
    z-index: 2;

    &.fixed {
        position: fixed;
        top: 60px;
        right: 0;
        left: 0;
    }
}

#repo-tabs {
    height: @tabHeight + 20px;
    background-color: #f6f7f8;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;

    .repo-tab-item {
        font-family: GothamPro;
        font-size: 13px;
        height: @tabHeight;
        line-height: @tabHeight;
        letter-spacing: 0.3px;
        text-align: center;
        color: #8f9aa8;
        display: inline-block;
        padding: 0 10px;
        position: relative;
        margin: 0 5px;

        &:first-child {
            margin-left: 15px;
        }

        &:last-child {
            margin-right: 15px;
        }

        &:after {
            transform: scaleX(0);
            transition: transform 0.3s;
            transform-origin: left center;
            content: '';
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 3px;
            background-color: #8f9aa8;
        }

        &.selected:after {
            transform: scaleX(1);
        }
    }
}

#repo-tab-content {
    position: relative;
    overflow: hidden;
    z-index: 1;

    .repo-content-item {
        padding: 15px;
        opacity: 0;
        transform: translate3d(0, 100px, 0);
        transition: opacity 1s, transform 1s;
        position: absolute;
        right: 15px;
        left: 15px;
        top: 15px;

        &.show {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            z-index: 99;
        }
    }

    #readme, #files, #languages {
        border-radius: 6px;
        background-color: #ffffff;
        border: solid 1px #e5e5e5;
    }
}

.file-item {
    display: flex;
    color: #8f9aa8;
    margin-bottom: 19px;

    &:last-child {
        margin-bottom: 0;
    }

    .file-icon {
        margin-right: 12px;
    }
    .file-name {
        font-family: GothamPro;
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 8px;
    }
    .file-date {
        font-family: GothamPro;
        font-size: 13px;
        color: #aeb6c0;
    }
}

.contrib-item {
    display: flex;
    color: #8f9aa8;
    margin-bottom: 5px;
    border-radius: 6px;
    background-color: #ffffff;
    border: solid 0.5px #e5e5e5;
    padding: 15px;

    &:last-child {
        margin-bottom: 0;
    }

    .contrib-avatar {
        margin-right: 15px;
        width: 40px;
        height: 40px;
        background-position: center center;
        background-size: cover;
        border-radius: 5px;
    }

    .contrib-name {
        font-family: GothamPro-Medium;
        font-size: 18px;
        letter-spacing: -0.2px;
        color: #5c6877;
        margin-bottom: 11px;
    }
    .contrib-value {
        font-family: GothamPro;
        font-size: 13px;
        color: #aeb6c0;
    }
}

.lang-item {
    display: flex;
    color: #8f9aa8;
    margin-bottom: 19px;
    align-items: center;
    &:last-child {
        margin-bottom: 0;
    }

    .lang-color {
        margin-right: 20px;
        width: 32px;
        height: 32px;
        border-radius: 16px;
    }
    .lang-name {
        font-family: GothamPro-Bold;
        font-size: 15px;
        line-height: 1.4;
        color: #5c6877;
        margin-bottom: 5px;
    }
    .lang-date {
        font-family: GothamPro;
        font-size: 13px;
        color: #aeb6c0;
    }
}

.empty-data {
    text-align: center;
    font-size: 15px;
    color: #ccc;
}

.offline-msg {
    margin: 20px 0;
    text-align: center;
    font-size: 15px;
    color: #ccc;
    .blue-link {
        color: #64b5f6;
        font-weight: bold;
        margin: 10px;
        text-transform: uppercase;
    }
    @-webkit-keyframes bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(3000px, 0, 0);
    transform: translate3d(3000px, 0, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(-25px, 0, 0);
    transform: translate3d(-25px, 0, 0);
  }

  75% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }

  90% {
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    -webkit-transform: translate3d(3000px, 0, 0);
    transform: translate3d(3000px, 0, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(-25px, 0, 0);
    transform: translate3d(-25px, 0, 0);
  }

  75% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }

  90% {
    -webkit-transform: translate3d(-5px, 0, 0);
    transform: translate3d(-5px, 0, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.bounceInRight {
  -webkit-animation-name: bounceInRight;
  animation-name: bounceInRight;
}
}
</style>
