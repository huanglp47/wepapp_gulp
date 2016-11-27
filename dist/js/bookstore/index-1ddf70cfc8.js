/**
 * Date:Sun Nov 27 2016 17:17:12 GMT+0800 (中国标准时间)
 */
define(function(require,exports,module){var o=require("common-8209176419.js"),n=function(){$.ajax({type:"POST",url:"/user/logout",success:function(n){0==n.status&&o.checkLogin()}})};exports.init=function(){$(".logout").click(function(){$(".login-pop").dialog()}),$(".login-pop .pop-confirm").click(function(){n()})}});