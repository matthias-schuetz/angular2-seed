System.config({
	packages: {
		'src': {
			defaultExtension: 'js'
		}
	}
});

System.import('./src/bootstrap.js').catch(function(err) {
	console.error(err);
});