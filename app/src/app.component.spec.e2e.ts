describe('App', () => {

    beforeEach( () => {
        browser.get('/');
    });

    it('should have a header title', () => {
        expect(browser.$('.header-title strong').getText()).toEqual('Angular 2');
    });

});
