/**
 * Gulp tasks
 *
 * The following tasks can be used to build and serve environments for development and production.
 * There are 5 main tasks which perform the actions respectively (TSLint will perform a code check in all tasks).
 *
 * gulp                 	Build/serve/watch dev environment on port 8080 (copies Angular 2 UMD bundles and TypeScript/Sass/Pug on start, no compilation of TypeScript/Sass/Pug during watch task, suitable for IDEs)
 * gulp start:dev       	Build/serve/watch dev environment on port 8080 (copies Angular 2 UMD bundles, compiles TypeScript/Sass/Pug during watch task)
 * gulp start:dev:separate	Same as 'start:dev' but copies all app files into a separate dev directory (JS/CSS files will also be compiled into that directory only)
 * gulp build:dev       	Build dev environment (copies Angular 2 UMD bundles files and compiles TypeScript/Sass/Pug)
 * gulp build:dev:separate	Same as 'build:dev' but copies all app files into a separate dev directory (JS/CSS files will also be compiled into that directory only)
 * gulp start:prod      	Build/serve prod environment on port 8081 (copies Angular 2 UMD bundles and TypeScript/Sass/Pug on start, no watch task, only for deployment)
 * gulp build:prod      	Build prod environment (compiles TypeScript/Sass/Pug, processes index.html, bundles vendor and Angular 2 JS files into one file, bundles CSS into one file and copies static files into dist/ folder)
 * gulp test:e2e       		Runs all E2E tests (assumes that dev server is running on port 8080, which is set as 'baseUrl' in protractor.conf)
 *
 */
var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var eventStream = require('event-stream');
var path = require('path');
var plumber = require('gulp-plumber');
var preprocess = require('gulp-preprocess');
var protractor = require('gulp-protractor').protractor;
var pug = require('gulp-pug');
var pump = require('pump');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var SystemJsBuilder = require('systemjs-builder');
var spawn = require('child_process').spawn;
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var useSeparateDev = false;
var webdriver;

/**
 * Configuration
 */
var paths = {
	pugSrc: './app/**/*.pug',
	sassSrc: './app/styles/**/*.scss',
	typescriptSrc: ['./app/src/**/*.ts', './typings/**/*.ts'],
	e2eTestsSrc: './app/src/**/*.spec.e2e.js',

	vendorJsLibs: {
		nodeModulesRoot: './node_modules/',
		dev: [
			{ path: './node_modules/@angular/common/bundles/common.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/compiler/bundles/compiler.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/core/bundles/core.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/forms/bundles/forms.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/http/bundles/http.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/platform-browser/bundles/platform-browser.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/@angular/router/bundles/router.umd.js', singleFile: true, dest: '@angular' },
			{ path: './node_modules/systemjs/dist/system.src.js', singleFile: true },
			{ path: './node_modules/systemjs/dist/system-polyfills.js', singleFile: true },
			{ path: './node_modules/core-js/client/shim.min.js', singleFile: true },
			{ path: './node_modules/zone.js/dist/zone.js', singleFile: true },
			{ path: './node_modules/zone.js/dist/long-stack-trace-zone.js', singleFile: true },
			{ path: './node_modules/reflect-metadata/Reflect.js', singleFile: true },
			{ path: './node_modules/rxjs/**/*.js', singleFile: false }
		],
		prod: {
			bundle: [
				'./node_modules/reflect-metadata/Reflect.js',
				'./node_modules/core-js/client/shim.min.js',
				'./node_modules/zone.js/dist/zone.min.js',
				'./node_modules/zone.js/dist/long-stack-trace-zone.min.js'
			],
			copy: [
				{ path: './node_modules/@angular/common/bundles/common.umd.min.js', dest: '@angular' },
				{ path: './node_modules/@angular/compiler/bundles/compiler.umd.min.js', dest: '@angular' },
				{ path: './node_modules/@angular/core/bundles/core.umd.min.js', dest: '@angular' },
				{ path: './node_modules/@angular/forms/bundles/forms.umd.min.js', dest: '@angular' },
				{ path: './node_modules/@angular/http/bundles/http.umd.min.js', dest: '@angular' },
				{ path: './node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js', dest: '@angular' },
				{ path: './node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js', dest: '@angular' },
				{ path: './node_modules/@angular/router/bundles/router.umd.min.js', dest: '@angular' },
				{ path: './node_modules/systemjs/dist/system.js' },
				{ path: './node_modules/systemjs/dist/system-polyfills.js' }
			]
		}
	},

	dev: {
		cleanSrc: './app/src/vendor/node_modules/*',
		pugDest: './app',
		sassDest: './app/styles',
		typescriptDest: './app/src',
		tslintDest: './app/src/**/*.ts',
		vendorJsDest: './app/src/vendor/node_modules',

		separateDest: {
			appDest: './app-dev',
			sassDest: './app-dev/styles',
			typescriptDest: './app-dev/src',
			staticSrc: [
				'./app/assets/*',
				'./app/**/*.css',
				'./app/**/*.html',
				'./app/*.js*',
				'./app/src/vendor/**/*.*',
			],
			serverRoot: './app-dev',
			serverFallback: './app-dev/index.html'
		},

		serverRoot: './app',
		serverFallback: './app/index.html',
		serverFileWatchers: {
			all: [
				'./app/assets/*',
				'./app/**/*.css',
				'./app/**/*.js',
				'./app/**/*.html'
			],
			watchCompile: [
				'./app/assets/*',
				'./app/*.js*',
				'./app/**/*.html'
			]
		}
	},
	prod: {
		cleanSrc: './dist/*',
		sassDest: './dist/styles',
		vendorJsDest: './dist/src/vendor',
		vendorJsNodeModulesDest: './dist/src/vendor/node_modules',

		htmlSrc: './app/index.html',
		htmlDest: './dist',

		staticBase: './app',
		staticJsSrc: [
			'./app/src/**/*.js',
			'!./app/src/vendor/**/*.*',
			'!./app/src/**/*.e2e.js'
		],
		staticSrc: [
			'./app/assets/**/*',
			'./app/src/**/*.html'
		],
		staticDest: './dist',

		vendorCssSrc: [
			'./app/styles/vendor/coresheet.min.css'
		],
		vendorCssOutFile: 'vendor.css',
		vendorCssDest: './dist/styles',

		systemjs: {
			rxjsBundleSrc: [
				'./node_modules/rxjs/add/**/*.js',
				'./node_modules/rxjs/observable/**/*.js',
				'./node_modules/rxjs/operator/**/*.js',
				'./node_modules/rxjs/scheduler/**/*.js',
				'./node_modules/rxjs/symbol/**/*.js',
				'./node_modules/rxjs/testing/**/*.js',
				'./node_modules/rxjs/util/**/*.js',
				'./node_modules/rxjs/*.js'
			].join(' + '),
			rxjsBundleDest: './dist/src/vendor/node_modules/rxjs.min.js',
			vendorBundleDest: 'vendor.min.js'
		},

		serverRoot: './dist',
		serverFallback: './dist/index.html'
	}
};

var systemjsConfig = {
	baseURL: './',
	defaultJSExtensions: true,
	paths: {
		'*': 'node_modules/*',
		'app/*': 'app/*'
	},
	map: {
		'rxjs': './rxjs'
	},
	packages: {
		'rxjs': {
			defaultExtension: 'js'
		}
	}
};

/**
 * Development tasks
 */
gulp.task('dev:clean', function () {
	return gulp.src(paths.dev.cleanSrc, { read: false })
		.pipe(clean());
});

gulp.task('dev:clean:separate', function () {
	return gulp.src(paths.dev.separateDest.appDest, { read: false })
		.pipe(clean());
});

gulp.task('dev:compile:pug', function (done) {
	return gulp.src(paths.pugSrc)
		.pipe(plumber())
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest(useSeparateDev ? paths.dev.separateDest.appDest : paths.dev.pugDest))
		.pipe(connect.reload())
		.on('error', function (error) {
			console.error('' + error);
		});
});

gulp.task('dev:compile:sass', function (done) {
	return gulp.src(paths.sassSrc)
		.pipe(sass())
		.pipe(gulp.dest(useSeparateDev ? paths.dev.separateDest.sassDest : paths.dev.sassDest))
		.pipe(connect.reload());
});

gulp.task('dev:compile:typescript', function () {
	var tsProject = ts.createProject('./tsconfig.json');
	var tsResult = gulp.src(paths.typescriptSrc)
		.pipe(ts(tsProject));

	return tsResult.js
		.pipe(gulp.dest(useSeparateDev ? paths.dev.separateDest.typescriptDest : paths.dev.typescriptDest))
		.pipe(connect.reload());
});

gulp.task('dev:copy:vendor-js', function () {
	var streams = paths.vendorJsLibs.dev.map(function (ref) {
		return gulp.src(ref.path, { base: ref.singleFile ? '' : paths.vendorJsLibs.nodeModulesRoot })
			.pipe(gulp.dest(ref.dest ? path.join(paths.dev.vendorJsDest, ref.dest) : paths.dev.vendorJsDest));
	});

	return eventStream.concat.apply(eventStream, streams);
});

gulp.task('dev:copy:static:separate', function (done) {
	gulp.src(paths.dev.separateDest.staticSrc, { base: './app' })
		.pipe(gulp.dest(paths.dev.separateDest.appDest));

	setTimeout(function () {
		gulp.src(paths.dev.separateDest.serverRoot)
			.pipe(connect.reload());

		done();
	}, 1000);
});

gulp.task('dev:tslint', function () {
	return gulp.src(paths.dev.tslintDest)
		.pipe(tslint())
		.pipe(tslint.report('prose'));
});

/**
 * Production tasks
 */
gulp.task('prod:bundle:vendor-css', function () {
	return gulp.src(paths.prod.vendorCssSrc)
		.pipe(concat(paths.prod.vendorCssOutFile))
		.pipe(gulp.dest(paths.prod.vendorCssDest));
});

gulp.task('prod:bundle:vendor-js', function (done) {
	var systemjs = new SystemJsBuilder(systemjsConfig);

	systemjs
		.bundle(paths.prod.systemjs.rxjsBundleSrc, paths.prod.systemjs.rxjsBundleDest, {
			sourceMaps: false,
			minify: true,
			mangle: true
		})
		.then(function () {
			gulp.src([paths.prod.systemjs.rxjsBundleDest])
				.pipe(replace(/\/index\.js/g, ''))
				.pipe(replace(/\.js"/g, '"'))
				.pipe(gulp.dest(paths.prod.vendorJsNodeModulesDest))
				.on('finish', function () {
					gulp.src(paths.vendorJsLibs.prod.bundle)
						.pipe(concat(paths.prod.systemjs.vendorBundleDest))
						.pipe(gulp.dest(paths.prod.vendorJsDest))
						.on('finish', function () {
							var streams = paths.vendorJsLibs.prod.copy.map(function (ref) {
								return gulp.src(ref.path)
									.pipe(gulp.dest(ref.dest ? path.join(paths.prod.vendorJsNodeModulesDest, ref.dest) : paths.prod.vendorJsNodeModulesDest));
							});

							eventStream.concat.apply(eventStream, streams);

							done();
						});
				});
		});
});

gulp.task('prod:clean', function () {
	return gulp.src(paths.prod.cleanSrc, { read: false })
		.pipe(clean());
});

gulp.task('prod:compile:sass', function () {
	return gulp.src(paths.sassSrc)
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(gulp.dest(paths.prod.sassDest));
});

gulp.task('prod:copy:js', function (done) {
	pump([
		gulp.src(paths.prod.staticJsSrc, { base: paths.prod.staticBase }),
		uglify(),
		gulp.dest(paths.prod.staticDest)
	], done);
});

gulp.task('prod:copy:static', function () {
	return gulp.src(paths.prod.staticSrc, { base: paths.prod.staticBase })
		.pipe(gulp.dest(paths.prod.staticDest));
});

gulp.task('prod:preprocess:html', function () {
	return gulp.src(paths.prod.htmlSrc)
		.pipe(preprocess())
		.pipe(gulp.dest(paths.prod.htmlDest));
});

/**
 * Server tasks
 */
gulp.task('reload:dev', function () {
	return gulp.src(paths.dev.serverRoot)
		.pipe(connect.reload());
});

gulp.task('serve:dev', function () {
	connect.server({
		port: '8080',
		root: paths.dev.serverRoot,
		fallback: paths.dev.serverFallback,
		livereload: true
	});
});

gulp.task('serve:dev:separate', function () {
	connect.server({
		port: '8080',
		root: paths.dev.separateDest.serverRoot,
		fallback: paths.dev.separateDest.serverFallback,
		livereload: true
	});
});

gulp.task('serve:prod', function () {
	connect.server({
		port: '8081',
		root: paths.prod.serverRoot,
		fallback: paths.prod.serverFallback,
		livereload: true
	});
});

gulp.task('watch:dev', function () {
	gulp.watch(paths.dev.serverFileWatchers.all, ['reload:dev']);
});

gulp.task('watch-compile:dev', function () {
	gulp.watch(paths.typescriptSrc, ['dev:tslint', 'dev:compile:typescript']);
	gulp.watch(paths.sassSrc, ['dev:compile:sass']);
	gulp.watch(paths.pugSrc, ['dev:compile:pug']);
	gulp.watch(paths.dev.serverFileWatchers.watchCompile, ['reload:dev']);
});

gulp.task('watch-compile:dev:separate-dev', function () {
	gulp.watch(paths.typescriptSrc, ['dev:tslint', 'dev:compile:typescript']);
	gulp.watch(paths.sassSrc, ['dev:compile:sass']);
	gulp.watch(paths.pugSrc, ['dev:compile:pug']);
	gulp.watch(paths.dev.serverFileWatchers.watchCompile, ['dev:copy:static:separate']);
});

/**
 * Test tasks
 */
gulp.task('tests:chrome', function () {
	return gulp.src([paths.e2eTestsSrc])
		.pipe(protractor({
			configFile: 'protractor.conf.js'
		}))
		.on('error', function (err) {
			console.log(err);
		});
});

/**
 * Main tasks
 */
gulp.task('build:dev', function (done) {
	runSequence('dev:tslint', 'dev:clean', 'dev:compile:sass', 'dev:compile:pug', 'dev:copy:vendor-js', 'dev:compile:typescript', done);
});

gulp.task('build:dev:separate', function (done) {
	runSequence('dev:tslint', 'dev:clean', 'dev:clean:separate', 'dev:compile:sass', 'dev:copy:vendor-js', 'dev:copy:static:separate', 'dev:compile:typescript', done);
});

gulp.task('build:prod', function (done) {
	runSequence('dev:tslint', 'prod:clean', 'prod:compile:sass', 'dev:compile:pug', 'dev:compile:typescript', 'prod:preprocess:html', 'prod:copy:static', 'prod:copy:js', 'prod:bundle:vendor-js', 'prod:bundle:vendor-css', done);
});

gulp.task('start:dev', function (done) {
	runSequence('build:dev', 'serve:dev', 'watch-compile:dev', done);
});

gulp.task('start:dev:separate', function (done) {
	useSeparateDev = true;
	runSequence('build:dev:separate', 'serve:dev:separate', 'watch-compile:dev:separate-dev', done);
});

gulp.task('start:prod', function (done) {
	runSequence('build:prod', 'serve:prod', done);
});

gulp.task('test:e2e', function (done) {
	runSequence('tests:chrome', done);
});

gulp.task('default', function (done) {
	runSequence('build:dev', 'serve:dev', 'watch:dev', done);
});