
fis.set('namespace', 'remreset');
fis.match('*.less', {
	parser: fis.plugin('less'),
	rExt: '.css',
	release: 'reset'
});