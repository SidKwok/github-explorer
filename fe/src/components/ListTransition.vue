<template lang="html">
    <transition-group tag="div"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        name="fade-up">
        <slot></slot>
    </transition-group>
</template>

<script>
import Dynamics from 'dynamics.js';
export default {
    methods: {
        beforeEnter(el) {
            Dynamics.css(el, {
                translateY: 400
            });
        },
        enter(el, done) {
            const delay = el.dataset.index;
            Dynamics.animate(
                el,
                {
                    translateY: 0
                },
                {
                    delay,
                    duration: 500,
                    complete: done
                }
            );
        }
    }
};
</script>

<style lang="css">
</style>
