/**
 * Date:Sun Nov 27 2016 17:17:12 GMT+0800 (中国标准时间)
 */
define(function(require,exports,module){exports.ready=function(){function t(t){return c[t]||0}function n(){$(".mejs-overlay-button").on("click",function(){i()&&f.play()})}function e(t){var e=new a(t);e.show(),n()}function i(){var n=s||Math.round((new Date).getTime()/1e3),i=t("t_1035"),u=t("t_1530"),a=t("t_1200"),c=t("t_1315");if(n<i){var f=l();return e(f),!1}if(n>u){var f=r();return e(f),!1}if(a<n&&n<c){var f=o();return e(f),!1}return!0}function o(){return{title:"懒人听书直播间",bodyHtml:"午休时间，13:15精彩继续！",isMaskClickClose:!0,btnLeft:"",btnRight:"确定",isAutoClose:0}}function r(){return{title:"懒人听书直播间",bodyHtml:"直播已经结束！",isMaskClickClose:!0,btnLeft:"",btnRight:"确定",isAutoClose:0}}function l(){return{title:"懒人听书直播间",bodyHtml:"直播将于10:35开始，请耐心等待：）<br>直播开始后如发现不能正常播放，请下拉页面刷新后重试。",isMaskClickClose:!0,height:"160px",btnLeft:"",btnRight:"确定",isAutoClose:0}}var u=$("#player1"),a=require("../widgets/dialog-d68472dbbc.js"),s=u.attr("data-time"),c={t_1035:"1459046100",t_1200:"1459051200",t_1315:"1459055700",t_1410:"1459059000",t_1530:"1459063800"},f=new MediaElementPlayer("#player1",{clickToPlayPause:!0,success:function(t,n,e){i()?e.play():e.setSrc("")},error:function(t){console.log(t)}})}});