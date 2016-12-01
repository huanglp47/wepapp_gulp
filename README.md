## ����gulp��ǰ���Զ����������

### 1.Gulp���

���gulp,node,npm��

#### 1.1 gulp

Gulp.js ��һ���Զ����������ߣ�ʹ��JavaScript��д��

Gulp.js �ǻ��� Node.js �����ģ����� Node.js �������������Կ��ٹ�����Ŀ������Ƶ���� IO ������

Gulp��Ҫ��װ�����ɹ���������Ҫnpm�����ߡ�

#### 1.2 npm
NPM����ͬNodeJSһ��װ�İ������ߡ�

Tip: ����ֱ��ʹ�� npm �Ĺٷ������Ƿǳ����ģ��Ƽ�ʹ���Ա� NPM ����
npm install cnpm -g --registry=https://registry.npm.taobao.org��Ȼ����cnpm install [name]

(ʹ��cnpm��webstorm�����Ľ��������node_modules �Ҽ� mark directory as > excluded WEBSTORM �Ͳ��Ῠ����)
#### 1.3 gulp��װ
���ȣ���Ҫ��ȫ�ְ�װGulp����npm install -g gulp

Ȼ������Ŀ���氲װGulp��npm install --save-dev  gulp

���������װ��
(cnpm) npm install gulp-jshint gulp-sass gulp-concat gulp-uglify gulp-rename --save-dev
����������package.json�����ֱ�� (cnpm) npm install
### 2.ҵ��ǰ�˹��̻��������
Ŀǰҵ����������Ľ�����������¼��֣�

���ڣ�fis���ٶȣ�

ǰ��������grunt, gulp, webpack
### 3.����gulp���������
���ߣ�gulp������java��maven,ant...����������

������nodejs��

Ŀ�꣺
* Js,css, ͼƬѹ����gulp-uglify��gulp-minify-css�� gulp-imagemin����
* js,css�����ļ����кϲ���gulp-concat��������http����
* ǰ����Դ·���滻,���滻ҳ����Դ���ã�gulp-rev��gulp-rev-collector����
* ��̬��Դcdn����.��ͨ���������ã�ʵ�ֱ��ؿ����������л�����
* cdn���洦��ʹ��MD5�滻�����ƣ���a.js�滻Ϊa-sdf10de34.js����
���̣�
node�����°�װgulp�Լ�gulp�����Ȼ��ǰĿ¼Terminal����gulp
## 4.��wapΪ�������Զ�������
### 4.1��̬��Դѹ����
ԭ��Ŀ¼:

![iamgee](https://github.com/huanglp47/myGulpProject/blob/master/project_before.png)

Gulp����������Ŀ¼��

![iamgee](https://github.com/huanglp47/myGulpProject/blob/master/project_after.png)

�����ڿ��ز�����
```js
//cdn
exports._cdnPrefix = 'http://sztmassets.lrts.me';
//exports._cdnPrefix = '';
// true��ʾ����������false��ʾ���Ի���������������
exports.test = false;
```
_cdnPrefix�൱��web���̵�${assetsHost}�� test�൱�ڻ����л�����
### 4.2 cdn���ټ���������
��distĿ¼������CDN��

Css:
```css
<link rel="stylesheet" href="http://sztmassets.lrts.me/wap/css/all_common-bcada22aa0.css" type="text/css">
<link rel="stylesheet" href="http://sztmassets.lrts.me/wap/css/personal-737ab75bb1.css" type="text/css">
```

Js:
```js
<!--��������-->
<script type="text/javascript" src="http://sztmassets.lrts.me/wap/js/all_common-da5694a8bc.js"></script>
```

��MD5�ļ�ָ�ƣ�������ʱ����÷Ǹ���ʽ��������ͬһ��js,css�в�ͬ�汾���ڣ�ֻ���޸Ĺ����ļ�MD5ֵ�Ż�䣬��ǿ��������
MD5�൱�ڼӡ�?v=${webVersion}��Ч����Ŀ��ȥ����
### 4.3�ļ��ϲ�
��gulpfile.js��ָ����Ҫ�ϲ����ļ�js.css
```js
//�ϲ�ָ��css
gulp.task('concat', function() {
    return gulp.src(['public/css/base.css', 'public/css/layout.css'])
        .pipe(concat('all_common.css'))//- �ϲ�����ļ���
        .pipe(gulp.dest('public/css'))
});
```
�ļ��ϲ����ƺ�̨��combo����Ŀ���Ǽ���HTTP������