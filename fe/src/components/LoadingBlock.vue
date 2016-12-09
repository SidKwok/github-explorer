<template lang="html">
    <div id="loading-block"
        :class="{
            'one': one,
            'two': two,
            'three': three,
            'failed': failed
            }"
    ></div>
</template>

<script>
export default {
    data() {
        return {
            one: false,
            two: false,
            three: false,
            timer: null
        }
    },
    props: {
        done: {
            type: Boolean,
            default: false
        },
        failed: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        done(val) {
            if (val) {
                this.three = true;
            }
        },
        failed(val) {
            if (val) {
                this.failed = true;
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.timer = setTimeout(() => this.one = true, 17);
            this.timer = setTimeout(() => this.two = true, 500);
        });
    },
    destroyed() {
        this.$nextTick(() => {
            this.timer && clearTimeout(this.timer);
        });
    }
}
</script>

<style lang="less">
#loading-block {
    height: 3px;
    width: 100%;
    background-color: #46a42f;
    transform: scaleX(0);
    z-index: 3;
    position: absolute;
    transform-origin: 0 0;

    &.failed {
        background-color: #f44336;
        transform: scaleX(1) !important;
        transition: transform 0.3s !important;
    }

    &.one {
        transform: scaleX(0.2);
        transition: transform 0.5s;
    }

    &.two {
        transform: scaleX(0.8);
        transition: transform 20s cubic-bezier(0, 1.17, 1, 1);
    }

    &.three {
        transform: scaleX(1);
        transition: transform 0.3s;
    }
}

</style>
