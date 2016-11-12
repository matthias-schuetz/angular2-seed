'use strict';

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/core-js/client/shim.min.js',
            'node_modules/reflect-metadata/Reflect.js',

            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',

            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

            { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },

            'karma-test-shim.js',

            { pattern: 'app/src/**/*.js', included: false, watched: true },
            { pattern: 'app/src/**/*.html', included: false, watched: true, served: true },
            { pattern: 'app/styles/**/*.css', included: false, watched: true, served: true }
        ],
	      proxies: {
            'app': '/base/app'
        },
        exclude: [
            'node_modules/**/*spec.js'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true
    });
};
