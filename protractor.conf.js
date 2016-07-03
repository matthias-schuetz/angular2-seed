exports.config = {

    baseUrl: 'http://localhost:8080/',

    /*
     * Set to direct connect if tests are run locally (only Chrome / Firefox)
     */
    // directConnect: true,

    /*
     * Set seleniumAddress to phantomJS Ghost instance
     * Usage: node node_modules/phantomjs/bin/phantomjs --webdriver=4444
     */
    seleniumAddress: 'http://localhost:4444',

    /*
     * Set seleniumAddress to webdriver-manager default when using other browsers
     * Usage: webdriver-manager start
     */
    // seleniumAddress: 'http://localhost:4444/wd/hub',

    specs: [
        './app/src/**/*.spec.e2e.js'
    ],

    framework: 'jasmine',

    jasmineNodeOpts: {
        showColors: true
    },

    capabilities: {
        // browserName: 'chrome'

        'browserName': 'phantomjs',
        'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs',
        'phantomjs.cli.args': ['--logfile=PATH', '--loglevel=DEBUG']
    },

    onPrepare: function() {
        const SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }));

        browser.ignoreSynchronization = false;
    },

    useAllAngular2AppRoots: true
};
