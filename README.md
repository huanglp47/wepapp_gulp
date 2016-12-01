## 基于gulp的前端自动化解决方案

### 1.Gulp简介

概念：gulp,node,npm。

#### 1.1 gulp

Gulp.js 是一个自动化构建工具，使用JavaScript编写。

Gulp.js 是基于 Node.js 构建的，利用 Node.js 流的威力，可以快速构建项目并减少频繁的 IO 操作。

Gulp需要安装插件完成构建任务。需要npm管理工具。

#### 1.2 npm
NPM是随同NodeJS一起安装的包管理工具。

Tip: 国内直接使用 npm 的官方镜像是非常慢的，推荐使用淘宝 NPM 镜像
npm install cnpm -g --registry=https://registry.npm.taobao.org，然后再cnpm install [name]

(使用cnpm后webstorm卡死的解决方法：node_modules 右键 mark directory as > excluded WEBSTORM 就不会卡死了)
#### 1.3 gulp安装
首先，需要在全局安装Gulp包：npm install -g gulp

然后，在项目里面安装Gulp：npm install --save-dev  gulp

其他插件安装：
(cnpm) npm install gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename --save-dev
或者在已有package.json情况下直接 (cnpm) npm install
### 2.业界前端工程化解决方案
目前业界的最主流的解决方案有以下几种：

国内：fis（百度）

前端社区：grunt, gulp, webpack
### 3.引入gulp解决的问题
工具：gulp（类似java的maven,ant...）及其插件。

环境：nodejs。

目标：
* Js,css, 图片压缩（gulp-uglify，gulp-minify-css， gulp-imagemin）。
* js,css公用文件进行合并（gulp-concat），减少http请求。
* 前端资源路径替换,如替换页面资源引用（gulp-rev，gulp-rev-collector）。
* 静态资源cdn部署.（通过参数配置，实现本地开发与线上切换）。
* cdn缓存处理（使用MD5替换，类似：将a.js替换为a-sdf10de34.js）。
过程：
node环境下安装gulp以及gulp插件，然后当前目录Terminal输入gulp
## 4.以wap为例进行自动化构建
### 4.1静态资源压缩。
原来目录:

![iamgee](https://github.com/huanglp47/myGulpProject/blob/master/project_before.png)

Gulp构建后生成目录：

![iamgee](https://github.com/huanglp47/myGulpProject/blob/master/project_after.png)

代码内开关参数：
```js
//cdn
exports._cdnPrefix = 'http://sztmassets.lrts.me';
//exports._cdnPrefix = '';
// true表示开发环境，false表示测试环境或者生产环境
exports.test = false;
```
_cdnPrefix相当于web工程的${assetsHost}， test相当于环境切换参数
### 4.2 cdn加速及缓存解决。
将dist目录发布到CDN。

Css:
```css
<link rel="stylesheet" href="http://sztmassets.lrts.me/wap/css/all_common-bcada22aa0.css" type="text/css">
<link rel="stylesheet" href="http://sztmassets.lrts.me/wap/css/personal-737ab75bb1.css" type="text/css">
```

Js:
```js
<!--生产环境-->
<script type="text/javascript" src="http://sztmassets.lrts.me/wap/js/all_common-da5694a8bc.js"></script>
```

加MD5文件指纹，发布的时候采用非覆盖式发布，即同一个js,css有不同版本存在，只有修改过的文件MD5值才会变，起到强缓存作用
MD5相当于加’?v=${webVersion}’效果，目的去缓存
### 4.3文件合并
在gulpfile.js内指定需要合并的文件js.css
```js
//合并指定css
gulp.task('concat', function() {
    return gulp.src(['public/css/base.css', 'public/css/layout.css'])
        .pipe(concat('all_common.css'))//- 合并后的文件名
        .pipe(gulp.dest('public/css'))
});
```
文件合并类似后台的combo服务，目的是减少HTTP请求数