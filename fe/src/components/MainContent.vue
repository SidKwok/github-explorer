<template lang="html">
    <div id="main-content">
        <toast :toast="toast"
                v-if="toast"
        ></toast>
        <header-bar></header-bar>
        <div id="scroll-section">
            <router-view></router-view>
            <footer-bar v-if="$route.name !== 'USER_REPO_LIST'"></footer-bar>
        </div>
    </div>
</template>

<script>
import Toast from './Toast';
import HeaderBar from './HeaderBar';
import FooterBar from './FooterBar';
export default {
    data() {
        return {
            scrollTop: 0,
            toast: null // object shape: { message: 'example', timeout: 3000, button: <Example /> }
        }
    },
    components: {
        Toast,
        HeaderBar,
        FooterBar
    }
}
</script>

<style lang="less">
#main-content {
    will-change: transform;
    transition: transform 0.3s cubic-bezier(0.7, 0, 0.25, 1),
                box-shadow 0.3s cubic-bezier(0.7, 0, 0.25, 1);
    box-shadow: -3px 0 5px 0 rgba(15, 31, 52, 0.4);
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(15, 32, 53, 1);

    #scroll-section {
        position: absolute;
        overflow-y: scroll; /* has to be scroll, not auto */
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        top: 60px;
        left: 0;
        right: 0;
        bottom: 0;
    }

}
</style>
