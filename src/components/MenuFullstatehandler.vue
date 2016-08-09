<template lang="html">
    <input type="checkbox" id="nav-menu-full-checkbox" :checked="full" />
</template>

<script>
export default {
    data() {
        return {
            full: false
        }
    },
    events: {
        'FULL_NAV_MENU': function() {
            this.full = true;
        },
        'OPEN_NAV_MENU': function() {
            this.full = false;
        },
        'CLOSE_NAV_MENU': function() {
            this.full = false;
        }
    }
}
</script>

<style lang="less">
input#nav-menu-full-checkbox {
  display: none;
}

input#nav-menu-full-checkbox:checked ~ #menu-overlay {
  transform: translate3d(-1000px, 0, 0);
}

input#nav-menu-full-checkbox:checked ~ #main-content {
  transform: translate3d(100%, 0, 0);
  box-shadow: none;
}

input#nav-menu-full-checkbox:checked ~ #nav-menu #cancel-button {
  opacity: 0.5;
}

</style>
