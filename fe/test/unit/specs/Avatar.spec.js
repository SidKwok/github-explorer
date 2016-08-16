import Vue from 'vue';
import Avatar from 'src/components/Avatar';

describe('Avatar.vue', () => {
    it('should set correct default data', () => {
        console.log(typeof Avatar.data)
        expect(Avatar.data).to.be.a('function');
        let defaultData = Avatar.data();
        expect(defaultData.img).to.be.equal(null);
        expect(defaultData.loaded).to.be.equal(false);
    });
});
