<template lang="html">
    <div>
        <div class="header" v-el:header>
            <hamburger-icon
                :open=""
                :back="shouldShowBackBtn()"
                @click="click"
            ></hamburger-icon>
            <a id="brand-logo" href="https://www.github.com"></a>
            <div id="notification-icon"></div>
        </div>
        <loading-block
            v-if="showLoading"
            :done="doneLoading"
            :failed="loadFailed"
        ></loading-block>
    </div>
</template>

<script>
import HamburgerIcon from './HamburgerIcon';
import LoadingBlock from './LoadingBlock';


import { toggleNavMenu } from '../vuex/actions';
import { getHeaderState } from '../vuex/getters'

export default {
    data() {
        return {
            scrollSection: null,
            wait: false
        }
    },
    computed: {
        routeName() {
            return this.$route.name;
        },
        showLoading() {
            return this.header.showLoading;
        },
        doneLoading() {
            return this.header.doneLoading;
        },
        loadFailed() {
            return this.header.loadFailed;
        }
    },
    vuex: {
        actions: {
            toggleNavMenu
        },
        getters: {
            header: getHeaderState
        }
    },
    components: {
        HamburgerIcon,
        LoadingBlock
    },
    methods: {
        shouldShowBackBtn() {
            switch (this.$route.name) {
              case 'USER_DETAIL': return false;
              case 'USER_REPO_LIST': return 'USER_DETAIL';
              case 'REPO_DETAIL': return 'USER_REPO_LIST';
              default: return false;
            }
        },
        click() {
            const backRoute = this.shouldShowBackBtn();
            if (backRoute) {
                this.$router.go({ name: backRoute })
            } else {
                // this.$dispatch('TOGGLE_NAV_MENU');
                this.toggleNavMenu();
            }
        },
        isUserPage() {
            return (this.$route.name === 'USER_DETAIL') ? true : false;
        },
    },
    events: {
        'MOUNT_HEADER_CHANGE': function() {
            this.$els.header.classList.remove('transparent');
            this.$els.header.classList.add('transparent');
            this.scrollSection = document.getElementById('scroll-section');
            this.wait = false;
        },
        'UNMOUNT_HEADER_CHANGE': function() {
            this.$els.header.classList.remove('transparent');
        },
        scrollEvent() {
            let lastScrollTop = this.scrollSection.scrollTop;
            if (this.wait === false) {
                window.requestAnimationFrame(() => {
                    // Access direct to the DOM for better scrolling performance
                    if (lastScrollTop === 0 && this.isUserPage()) {
                        this.$els.header.classList.add('transparent');
                    } else {
                        this.$els.header.classList.remove('transparent');
                    }
                    this.wait = false;
                });
                this.wait = true;
            }
        }
    },
}
</script>

<style lang="less">
@headerHeight: 60px;

.header {
  @backgroundColor: #0F2035;
  @icon-width: 50px;
  display: flex;
  height: @headerHeight;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 2;
  background-color: rgba(15, 32, 53, 1);
  transform: translate3d(0, 0, 0);
  box-shadow: 0 3px 5px 0 rgba(15, 31, 52, 0.4);
  transition: background-color 0.3s;

  &.transparent {
    background-color: #224365;
    box-shadow: none;
  }

  #hamberger-menu {
    height: @headerHeight;
    width: @icon-width;
  }
  #notification-icon {
    background-image: url('../assets/notification-icon.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 15px 17px;
    height: @headerHeight;
    width: @icon-width;
  }
  #brand-logo {
    display: block;
    background-image: url('../assets/github-logo.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 74px 20px;
    height: @headerHeight;
    width: 74px;
  }
}

</style>
