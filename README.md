### remreset.js
动态rem——移动端适配方案

### 如何使用
#### 1、内联引入remrest.js

```
<script type="text/javascript" src="lib/remreset.js?__inline"></script>
```

#### 2、编写css

* 如果不想将px转换为rem，则rule后面增加注释 `/*no*/`
* 字体仍然使用px作为单位，则rule后面增加注释 `/*px*/`。remreset插件会自动将该rule转换为[data-dpr="1"],[data-dpr="2"],[data-dpr="3"]下的rule


```
.header {
	width: 200px;
	border: 1px solid #ccc; /*no*/
	font-size: 18px; /*px*/
}
```

#### 3、配置fis

* dpr: 视觉稿对应设备的dpr值，默认是2
* remUnit: 视觉稿宽度/10，默认是75

```
fis.match("*.less", {
    parser : fis.plugin('less'),
    postprocessor: fis.plugin('remreset', {
    	dpr: 2,
    	remUnit: 75
    }),
    rExt   : '.css'
});
```