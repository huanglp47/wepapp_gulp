/**
 * Date:Sun Nov 27 2016 17:17:12 GMT+0800 (中国标准时间)
 */
var u=navigator.userAgent;window.browser={trident:u.indexOf("Trident")>-1,presto:u.indexOf("Presto")>-1,webKit:u.indexOf("AppleWebKit")>-1,gecko:u.indexOf("Gecko")>-1&&u.indexOf("KHTML")==-1,mobile:!!u.match(/AppleWebKit.*Mobile.*/),ios:!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:u.indexOf("Android")>-1||u.indexOf("Linux")>-1,iPhone:u.indexOf("iPhone")>-1,iPad:u.indexOf("iPad")>-1,webApp:u.indexOf("Safari")==-1,isWebchat:/micromessenger/i.test(u),isWeiboChat:/weibo/i.test(u)},$(function(){var i={init:function(){this.initPlatform(),this.setHeaderHeight(),this.bindEvent()},wakeUpLazyApp:function(){var i=$("#runapp").val();i&&window.location.search.indexOf("runapp")>-1&&(this.isAboveIos9()?(location.href=i,setTimeout(function(){location.href="/about/download"},2500)):($("body").append('<iframe style="height:0px;visibility:hidden;position:absolute;" src="'+i+'" frameborder="0"></iframe>'),setTimeout(function(){location.href="/about/download"},2500)))},isAboveIos9:function(){var i=navigator.userAgent;if(i.match(/iPhone|iPad|iPod/i)){var o=i.match(/OS (\d+)_(\d+)_?(\d+)?/);return o=parseInt(o[1],10),o>=9}return!1},initPlatform:function(){var i=$(document.body),o=navigator.userAgent.toLowerCase();return o.indexOf("android 2.3")>-1&&i.addClass("low-version"),window.browser.android&&i.addClass("page-android"),window.browser.ios&&i.addClass("page-ios"),this},setHeaderHeight:function(){$("header").height($(".fixednav").height())},bindEvent:function(){var i=$(".g-gotop"),o=this;$(window).on("scroll",function(){$(window).scrollTop()>$(window).height()?i.show().on("click",function(){$(window).scrollTop(0)}):i.hide()}).on("load",function(){setTimeout(function(){window.scrollTo(0,1)},0)}).on("click",".g-goback",function(){window.history.go(-1)}),$(document).on("click","#J_wakeUpApp",function(i){o.wakeUpLazyApp(),i.preventDefault()}),$("img.lazy").each(function(){var i=$(this);i.hasClass("lazy_spe")&&i.lazyload({threshold:100})})}};i.init()});