/**
 * Date:Sun Nov 27 2016 17:17:12 GMT+0800 (中国标准时间)
 */
define(function(require,exports,module){exports.ready=function(){function t(){var t={title:"懒人听书直播间",bodyHtml:"直播已经结束！",isMaskClickClose:!0,btnLeft:"",btnRight:"确定",isAutoClose:0};return t}function e(){var t={title:"懒人听书直播间",bodyHtml:"直播还没开始，请耐心等待：）<br>直播开始后如发现不能正常播放，请下拉页面刷新后重试。",isMaskClickClose:!0,height:"160px",btnLeft:"",btnRight:"确定",isAutoClose:0};return t}function n(){c.html("直播已结束"),d.addClass("opacity05")}function i(){var i=$("#video").attr("data-time")||Math.round((new Date).getTime()/1e3),a=1453874400,r=1453888800;if(i<a){var o=new s(e());return o.show(),!1}if(i>r){n();var o=new s(t());return o.show(),!1}return!0}var a=0,r=null,o=$(".player-cd"),s=require("../widgets/dialog-d68472dbbc.js");$(".player-mini,.bottom").hide(),$(".player-mini-wrapper").siblings("audio").attr("src","");var l=document.getElementById("video"),d=$(".player-play"),u=$(".player-plaue"),c=$(".player-info").find("p");l.addEventListener("play",function(){i()&&(setTimeout(function(){l.play()},100),d.hide().siblings("i").show(),r=setInterval(function(){a++,o.css({"-webkit-transform":"rotate("+a+"deg)","-moz-transform":"rotate("+a+"deg)","-ms-transform":"rotate("+a+"deg)",transform:"rotate("+a+"deg)"})},50))}),l.addEventListener("pause",function(){u.hide().siblings("i").show(),clearInterval(r)}),l.addEventListener("ended",function(){u.hide().siblings("i").show(),clearInterval(r),n()}),d.on("click",function(){i()&&l.play()}),u.on("click",function(){l.pause()})}});