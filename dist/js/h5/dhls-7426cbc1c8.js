/**
 * Date:Sun Nov 27 2016 17:17:12 GMT+0800 (中国标准时间)
 */
define(function(require,exports,module){exports.ready=function(){var t={init:function(){this.initVoteState(),this.bindEventForHotList()},initVoteState:function(){var t=this,n=$(".voted");n.each(function(){t.disableVoteBtn($(this))})},wait:function(t,n){var t=parseInt(t,10);setTimeout(function(){"function"==typeof n&&n()},t)},updateVoteNum:function(t,n){var o=t+1,i=n.html();/\./.test(i)?n.html(i):(o>=1e5&&(o=(o/1e4).toFixed(2)+"万"),n.html(o))},getAjax:function(t,n){$.ajax({url:t,type:"get",success:function(t){0==t.status?n(t):alert(t.msg)},error:function(t){console.log(t)}})},disableOtherBtn:function(t){t.addClass("voted"),t.find("span").html("已投"),this.disableVoteBtn(t)},disableVoteBtn:function(t){t.parents("ul").find(".vote-btn").not(".voted").addClass("not-allow-voted")},bindEventForHotList:function(){var t=this;$(".book-list-item").on("touchstart click",".J_vote_btn",function(n){n.preventDefault(),n.stopPropagation();var o=$(this),i=o.parents(".book-list-item-wrap"),e=i.find(".J_vote_plus"),a=i.find(".J_vote_num");if(!o.hasClass("not-allow-voted")&&!o.hasClass("voted")){var s=o.attr("data-id"),d="/ajax/dhls/vote?id="+s+"&type=3";t.getAjax(d,function(){o.addClass("on"),t.wait(600,function(){o.removeClass("on"),t.wait(600,function(){t.disableOtherBtn(o)}),e.animate({bottom:"10%",opacity:1,"font-size":"24px"},600,function(){e.animate({bottom:"0",opacity:0,"font-size":"14px"},600,function(){var n=a.attr("data-num");t.updateVoteNum(parseInt(n),a)})})})})}}).on("click","li",function(){var t=$(this),n=t.index(),o=$(".ah-book-sort-ul");t.addClass("voted").siblings("li").removeClass("voted"),o.eq(n).show().siblings("li").hide()})}};t.init()}});