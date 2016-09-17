System.config({
	baseURL: './',
	map: {
		'@angular/core': 'src/vendor/node_modules/@angular/core.umd.js',
		'@angular/common': 'src/vendor/node_modules/@angular/common.umd.js',
		'@angular/compiler': 'src/vendor/node_modules/@angular/compiler.umd.js',
		'@angular/forms': 'src/vendor/node_modules/@angular/forms.umd.js',
		'@angular/http': 'src/vendor/node_modules/@angular/http.umd.js',
		'@angular/platform-browser': 'src/vendor/node_modules/@angular/platform-browser.umd.js',
		'@angular/platform-browser-dynamic': 'src/vendor/node_modules/@angular/platform-browser-dynamic.umd.js',
		'@angular/router': 'src/vendor/node_modules/@angular/router.umd.js',
		'rxjs': 'src/vendor/node_modules/rxjs'
	},
	packages: {
		'src': {
			defaultExtension: 'js'
		},
		'rxjs': {
			defaultExtension: 'js'
		}
	}
});

System.import('./src/bootstrap.js').catch(function(err) {
	console.error(err);
});