import Vue from 'vue';
import FooterBar from 'src/components/FooterBar';

describe('FooterBar.vue', () => {
    it('should render correct content', () => {
        const vm = new Vue({
            template: '<div><footer-bar></footer-bar></div>',
            components: { FooterBar }
        }).$mount();
        expect(vm.$el.querySelector('#version').textContent).to.contain('Vue');
    });
});
