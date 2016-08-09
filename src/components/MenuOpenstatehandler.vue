<template lang="html">
    <input type="checkbox" id="nav-menu-open-checkbox" :checked="open" />
</template>

<script>
export default {
    data() {
        return {
            open: false
        }
    },
    events: {
        'TOGGLE_NAV_MENU': function() {
            this.open = !this.open;
        },
        'OPEN_NAV_MENU': function() {
            this.open = true;
        },
        'CLOSE_NAV_MENU': function() {
            this.open = false;
        }
    }
}
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
