Error.stackTraceLimit = 0;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

var builtPath = '/base/app/';

__karma__.loaded = function() {};

function isJsFile(path) {
    return path.slice(-3) === '.js';
}

function isSpecFile(path) {
    return /\.spec\.(.*\.)?js$/.test(path);
}

function isBuiltFile(path) {
    return isJsFile(path) && (path.substr(0, builtPath.length) === builtPath);
}

var allSpecFiles = Object.keys(window.__karma__.files)
    .filter(isSpecFile)
    .filter(isBuiltFile);

System.config({
    baseURL: '/base/app',
    packages: {
        'src': {
            defaultExtension: 'js'
        },
		'rxjs': {
			defaultExtension: 'js'
		},
        'testing': {
            main: 'index.js',
            defaultExtension: 'js'
        }
    },
    map: {
        app: 'src',

        '@angular/core': 'src/vendor/node_modules/@angular/core.umd.js',
        '@angular/common': 'src/vendor/node_modules/@angular/common.umd.js',
        '@angular/compiler': 'src/vendor/node_modules/@angular/compiler.umd.js',
        '@angular/forms': 'src/vendor/node_modules/@angular/forms.umd.js',
        '@angular/http': 'src/vendor/node_modules/@angular/http.umd.js',
        '@angular/platform-browser': 'src/vendor/node_modules/@angular/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'src/vendor/node_modules/@angular/platform-browser-dynamic.umd.js',
        '@angular/router': 'src/vendor/node_modules/@angular/router.umd.js',

        '@angular/core/testing': 'src/vendor/node_modules/@angular/core-testing.umd.js',
        '@angular/common/testing': 'src/vendor/node_modules/@angular/common-testing.umd.js',
        '@angular/compiler/testing': 'src/vendor/node_modules/@angular/compiler-testing.umd.js',
        '@angular/platform-browser/testing': 'src/vendor/node_modules/@angular/platform-browser-testing.umd.js',
        '@angular/platform-browser-dynamic/testing': 'src/vendor/node_modules/@angular/platform-browser-dynamic-testing.umd.js',
        '@angular/http/testing': 'src/vendor/node_modules/@angular/http-testing.umd.js',
        '@angular/router/testing': 'src/vendor/node_modules/@angular/router-testing.umd.js',
        '@angular/forms/testing': 'src/vendor/node_modules/@angular/forms-testing.umd.js',

        'rxjs': 'src/vendor/node_modules/rxjs'
    }
});

function initTestBed(){
    return Promise.all([
        System.import('@angular/core/testing'),
        System.import('@angular/platform-browser-dynamic/testing')
    ])
        .then(function(providers) {
            var coreTesting = providers[0];
            var browserTesting = providers[1];

            coreTesting.TestBed.initTestEnvironment(
                browserTesting.BrowserDynamicTestingModule,
                browserTesting.platformBrowserDynamicTesting()
            );
        });
}

function initTesting () {
    return Promise.all(allSpecFiles.map(function(moduleName) {
        return System.import(moduleName);
    }))
        .then(__karma__.start, __karma__.error);
}

initTestBed().then(initTesting);
