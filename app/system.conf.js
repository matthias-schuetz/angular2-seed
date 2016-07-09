System.config({
	baseURL: './',
	map: {
		'@angular': 'src/vendor/node_modules/@angular',
		'rxjs': 'src/vendor/node_modules/rxjs'
	},
	packages: {
		'src': {
			defaultExtension: 'js'
		},
		'@angular/common': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/compiler': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/core': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/http': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/platform-browser': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/platform-browser-dynamic': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'@angular/router': {
			main: 'index.js',
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