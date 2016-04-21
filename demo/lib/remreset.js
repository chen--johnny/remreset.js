/**
 * 使用rem作为长度单位的适配方案
 * 页面中不要包含<meta name="viewport" />标签，因为这个库会自动添加这个标签
 * @param  {Object} win window对象
 * @return {[type]}     [description]
 */
;(function(win) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    
    if (metaEl) {
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    }
    if (!dpr && !scale) {
        var devicePixelRatio = win.devicePixelRatio;
        // 判断dpr是否为整数
        var isNormalDpr = devicePixelRatio.toString().match(/^[1-9]\d*$/g)
        if (isNormalDpr) {
            // 对于是整数的dpr，对dpr进行操作
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
                dpr = 2;
            } else {
                dpr = 1;
            }
        }
        else {
            dpr = 1;
        }

        scale = 1 / dpr;
    }
    // 先设置viewport meta，然后document.documentElement.getBoundingClientRect().width才能获取到正确的值
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }
    
    docEl.setAttribute('data-dpr', dpr);

    function resetRootFontSize(){
        // 对于大屏幕，如ipad，同样可以使用rem方案，因此没必要限制这个宽度大小
        var width = docEl.getBoundingClientRect().width;
        // 1rem = visual viewport宽度 * dpr / 10
        // iphone6: 1rem = 375px * 2 / 10
        var rem = width / 10;
        docEl.style.fontSize = rem + 'px';
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(resetRootFontSize, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(resetRootFontSize, 300);
        }
    }, false);

    // 重置页面中的字体默认值，否则没有设置font-size的元素会继承html上的font-size，字体会很大
    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }
    
    resetRootFontSize();
})(window);