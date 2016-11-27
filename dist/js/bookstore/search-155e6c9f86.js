/**
 * Date:Sun Nov 27 2016 17:17:12 GMT+0800 (中国标准时间)
 */
define(function(require,exports,module){function a(a){var a=$.trim($("#keyword").val());if(a){if(localStorage){var e=localStorage.getItem("search-history")||a;e.indexOf(a)==-1&&(e+=","+a),localStorage.setItem("search-history",e)}var o="/search/"+a;history.pushState("","",o),t.page.load(o)}}var t=require("common-8209176419.js");exports.init=function(){$(".search-conatiner a").click(function(){a()})}});