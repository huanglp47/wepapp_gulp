# all_about_h5
html5,css3  
web app一般会有这三种主要布局： 
## 1.媒体查询响应式   
```css
@media only screen and (max-width: 320px), only screen and (max-device-width:320px) {
    html {
      font-size:10px;
    }
}
@media only screen and (max-width: 640px), only screen and (max-device-width:640px) {
    html {
      font-size:20px;
    }
}  
```

## 2.流式布局。width:100% + flexbox;高度大都是用px来固定住。 

## 3.rem布局：  
使用js动态计算font-size的值（例子：[网易](http://3g.163.com/touch/all?version=v_standard) [淘宝](https://m.taobao.com/?sprefer=sypc00#index)）  
  * 1.设置viewport  
```html
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui" />  
 ```  
    
  * 2.js代码放到head里，第一时间计算好html的fontSize，避免重绘。  
  
  * 计算规则：假设设计图是基于640px(750类似算法)设计，那么屏幕宽度 client_width=document.documentElement.clientWidth，fontSize = 100*(client_width/640)+'px';当分辨率变化时（触发横竖屏事件orientationchange或者浏览器resize）。则通过addEventListener做绑定

