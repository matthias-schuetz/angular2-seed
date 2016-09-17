exports.config = {

    baseUrl: 'http://localhost:8080/',

    /*
     * Set to direct connect if tests are run locally (only Chrome / Firefox)
     */
    // directConnect: true,

    /*
     * Set seleniumAddress to webdriver-manager default when using other browsers
     * Usage: webdriver-manager start
     */
    seleniumAddress: 'http://localhost:4444/wd/hub',

    framework: 'jasmine',

    jasmineNodeOpts: {
        showColors: true
    },

    capabilities: {
        browserName: 'chrome'
    },

    onPrepare: function() {
        const SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));

        browser.ignoreSynchronization = false;
    },

    useAllAngular2AppRoots: true
};
