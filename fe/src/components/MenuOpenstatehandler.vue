<template lang="html">
    <input type="checkbox" id="nav-menu-open-checkbox" :checked="open" />
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters({
            open: 'getOpenState'
        })
    }
};
</script>

<style lang="less">
input#nav-menu-open-checkbox {
    display: none;
}

input#nav-menu-open-checkbox:checked ~ #menu-overlay {
    transform: translate3d(0, 0, 0);
}

input#nav-menu-open-checkbox:checked ~ #main-content {
    transform: translate3d(84%, 0, 0);
}

input#nav-menu-open-checkbox:checked ~ #nav-menu {
    opacity: 0.99;
    transform: translate3d(0, 0, 0);
}
</style>
