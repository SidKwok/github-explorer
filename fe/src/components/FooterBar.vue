<template lang="html">
    <div class="footer original">
        <div id="footer-logo">
            <a href="https://github.com/SidKwok/github-explorer" target="_blank" rel="noreferrer">
                <i class="fa fa-github"></i>
                <span id="version">
                    Vue
                </span>
            </a>
        </div>
        <div id="footer-credit">
            Yo, I'm Sid. <br />
            Breaker of Chains.
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.footer {
    height: 35px;
    background-color: #0f2035;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    z-index: 1;
    position: relative;

    #footer-logo {
        font-size: 38px;
        line-height: 38px;
        a {
            color: #ffffff;
        }
    }

    #footer-credit {
        opacity: 0.6;
        font-family: GothamPro;
        font-size: 13px;
        line-height: 1.5;
        letter-spacing: 0.3px;
        text-align: right;
        color: #aeb6c0;
    }

    #version {
        font-size: 12px;
        vertical-align: middle;
        margin-left: 10px;
    }
}
</style>
