import Vue from 'vue';
import Avatar from 'src/components/Avatar';
import FooterBar from 'src/components/FooterBar';

describe('Avatar.vue', () => {
    it('should set correct default data', () => {
        expect(Avatar.data).to.be.a('function');
        let defaultData = Avatar.data();
        expect(defaultData.img).to.be.equal(null);
        expect(defaultData.loaded).to.be.equal(false);
    });

    it('should have suitable props', () => {
        expect(Avatar.props).to.be.an('Array');
    });
});

describe('FooterBar.vue', () => {
    it('should render correct content', () => {
        const vm = new Vue({
            template: '<div><footer-bar></footer-bar></div>',
            components: { FooterBar }
        }).$mount();
        expect(vm.$el.querySelector('#version').textContent).to.contain('Vue');
    });
});
