describe('App', () => {

    beforeEach( () => {
        browser.get('/');
    });

    it('should have a title', () => {
        expect(browser.getTitle()).toEqual('Angular 2 Seed [using RC3] - Minimalistic TypeScript starter project');
    });

});
