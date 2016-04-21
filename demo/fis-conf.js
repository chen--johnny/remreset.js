
fis.set('namespace', 'remreset');

// 编译less, px转换为rem
fis.match("*.less", {
    parser : fis.plugin('less'),
    postprocessor: fis.plugin('remreset', {
    	dpr: 2, // 2 = 视觉稿对应设备的dpr值
    	remUnit: 75 // 75 = 视觉稿宽度/10
    }),
    rExt   : '.css'
});

// 发布
fis.match('*', {
	release: '/static/remreset/$0'
})
.match('{/node_modules/**,package.json}', {
	release: false
})
.match('**', {
    deploy: [
        fis.plugin('encoding'),
        fis.plugin('local-deliver')
    ]
});
