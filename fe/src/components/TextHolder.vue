<template lang="html">
    <span
        :class="{
            'text-holder-wrapper': content === undefined,
            'center': center
            }"
        :style="styleObj"
    >
        <div class="text-holder" v-if="!content"></div>
        <slot></slot>
    </span>
</template>

<script>
export default {
    props: ['width', 'height', 'center'],
    computed: {
        styleObj() {
            if (this.content) {
                return {
                    width: this.width,
                    hetight: this.height
                }
            } else {
                return null
            }
        }
    }
}
</script>

<style lang="less">
.text-holder-wrapper {
    display: block;
    transform: translate3d(0, 0, 0);
    &.center {
        margin: 0 auto;
    }
    .text-holder {
        background-color: rgba(136, 136, 136, 0.2);
        height: 100%;
    }
}
</style>
