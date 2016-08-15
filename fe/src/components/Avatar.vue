<template lang="html">
    <div class="image-fade"
        :id="id"
        :class="className"
        :style="loaded ? {
            backgroundImage: `url('${src}')`,
            opacity: 1,
        } : {}">
    </div>
</template>

<script>
export default {
    data() {
        return {
            img: null,
            loaded: false
        }
    },
    props: ['src', 'className', 'id'],
    attached() {
        this.loadImg();
    },
    watch: {
        'src': function() {
            this.loadImg();
        }
    },
    methods: {
        loadImg() {
            this.loaded = false;
            if (this.src) {
                this.img = new window.Image();
                this.img.onload = () => {
                    this.loaded = true;
                };
                this.img.src = this.src;
            }
        }
    }
}
</script>

<style lang="less">
.image-fade {
    opacity: 0.01;
    transition: opacity 0.5s;
}

</style>
