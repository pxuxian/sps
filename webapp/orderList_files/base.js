var defaultKey = '';
$(function(){
	//查询后台设置的搜索框默认关键字
	
	//anhui 20141023 合并主页异步请求    合并后的文件请见：footer.vm setTimeout 代码段
	/*var proxy_url = "/httpProxyAccess.htm?t="+new Date().getTime();
	var url = domain_public+"/selectSearchDefaultKey.htm?t="+new Date().getTime();
	var key = $("#wd").val();
	if(key == ''){
    	jQuery.ajax({
    		 type:'post',
    		 url:proxy_url,
    		 data:{target:url,'name':'searchBoxDefaultKey'},
    		 dataType:'json',
    		 cache:false,
    		 success:function(data){
    			if(data && data.defaultSearchKey != null && data.defaultSearchKey != ''){
    			    $("#wd").val(data.defaultSearchKey);
    			    //搜索页底部搜索框
    			    $("#bottomKeys").val(data.defaultSearchKey);
    			    defaultKey = data.defaultSearchKey;
    			}else{
    				//$("#wd").val("三人炫");
    				//$("#bottomKeys").val("三人炫");
    				//defaultKey = "三人炫";
    			}
    		 }
    	});
	}*/
	
});

Date.prototype.format=function(format){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),"S":this.getMilliseconds()};if(/(y+)/.test(format)){format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))}for(var k in o){if(new RegExp("("+k+")").test(format)){format=format.replace(RegExp.$1,RegExp.$1.length==1?o[k]:("00"+o[k]).substr((""+o[k]).length))}}return format};function addToFavorite(){var a=domain_home+"/",b="酒仙网";document.all?window.external.AddFavorite(a,b):window.sidebar&&window.sidebar.addPanel?window.sidebar.addPanel(b,a,""):alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。")}function searchRelatedkeys(event){event=event||window.event;var keyCode=event.keyCode;if(keyCode=="40"||keyCode=="38"){return}var value=jQuery(".searchBg").val();var keywords=jQuery.trim(value);if(keywords==""){jQuery(".searchCon").hide();return false}$.support.cors=true;$.ajax({type:"POST",url:domain_list+"/associate.htm?t="+new Date().getTime(),data:{wd:keywords},dataType:"jsonp",success:function(data){if(data==null){return null}if(data.resultList!=""){jQuery(".searchCon").show();var keyslistHtml="<ul>";var jsonList=data.resultList;for(var i=0;i<jsonList.length;i++){keyslistHtml+='<li><a href="'+jsonList[i].url+'"><span class="searchName">'+jsonList[i].name+'</span><span class="searchSum">约<font>'+jsonList[i].count+"</font>件商品</span></a></li>"}keyslistHtml+='<li><span class="searchClose">关闭</span></li>';keyslistHtml+="</ul>";$(".searchCon").html(keyslistHtml)}else{$(".searchCon").hide()}}})}function movesel(event){event=event||window.event;var keyCode=event.keyCode;if(keyCode=="40"){var objall=$(".searchCon li");var all=objall.size()-2;var yy=$(".searchCon li:eq("+all+") a");if(yy.css("background-color")=="rgb(255, 223, 198)"||yy.css("background-color")=="#ffdfc6"){var x=$(".searchCon li:eq(0) a span:first");var y=$(".searchCon li:eq(0) a");$(".searchBg").val(x.text());$(".searchCon li a").css("background-color","#ffffff");y.css("background-color","#ffdfc6");return}for(var i=0;i<9;i++){var objy=$(".searchCon li:eq("+i+")").find("a");if(objy.css("background-color")=="rgb(255, 223, 198)"||objy.css("background-color")=="#ffdfc6"){$(".searchCon li a").css("background-color","#ffffff");var ox=$(".searchCon li:eq("+(i+1)+") a span:first");var oy=$(".searchCon li:eq("+(i+1)+")").find("a");$(".searchBg").val(ox.text());oy.css("background-color","#ffdfc6");return}}var x=$(".searchCon li:eq(0) a span:first");var y=$(".searchCon li:eq(0)").find("a");$(".searchBg").val(x.text());y.css("background-color","#ffdfc6")}else{if(keyCode=="38"){var objall=$(".searchCon li");var all=objall.size()-2;var yy=$(".searchCon li:eq(0) a");if(yy.css("background-color")=="rgb(255, 223, 198)"||yy.css("background-color")=="#ffdfc6"){var x=$(".searchCon li:eq("+all+") a span:first");var y=$(".searchCon li:eq("+all+") a");$(".searchBg").val(x.text());$(".searchCon li a").css("background-color","#ffffff");y.css("background-color","#ffdfc6");return}for(var i=9;i>0;i--){var objy=$(".searchCon li:eq("+i+") a");if(objy.css("background-color")=="rgb(255, 223, 198)"||objy.css("background-color")=="#ffdfc6"){$(".searchCon li a").css("background-color","#ffffff");var ox=$(".searchCon li:eq("+(i-1)+") a span:first");var oy=$(".searchCon li:eq("+(i-1)+") a");$(".searchBg").val(ox.text());oy.css("background-color","#ffdfc6");return}}var x=$(".searchCon li:eq("+all+") a span:first");var y=$(".searchCon li:eq("+all+") a");$(".searchBg").val(x.text());y.css("background-color","#ffdfc6")}else{if(keyCode=="13"){for(var i=0;i<10;i++){var objy=$(".searchCon li:eq("+i+")").find("a");if(objy.css("background-color")=="rgb(255, 223, 198)"||objy.css("background-color")=="#ffdfc6"){var url=$(".searchCon li:eq("+i+") a").attr("href");window.location.href=url;return}}}}}}function get_length(s){var char_length=0;for(var i=0;i<s.length;i++){var son_char=s.charAt(i);encodeURI(son_char).length>2?char_length+=1:char_length+=0.5}return char_length}function cut_str(str,len){var char_length=0;var sub_len=0;for(var i=0;i<str.length;i++){var son_str=str.charAt(i);encodeURI(son_str).length>2?char_length+=1:char_length+=0.5;if(char_length>=len){sub_len=char_length==len?i+1:i;break}}var rstr=str;if(sub_len>0){rstr=str.substr(0,sub_len)}return rstr}function shopingCartPlug(){var real_url=domain_cart+"/loadMyCartJson.htm?t="+new Date().getTime();$.support.cors=true;$.ajax({type:"GET",url:"/httpProxyAccess.htm?t="+new Date().getTime(),data:{target:real_url},dataType:"json",success:function(data){if(data==null){return null}if(data.result!=""){var cartPlugNum=0;var cartListHtml="";if(data.result.list!=""){var cartProList=data.result.list;for(var i=0;i<cartProList.length;i++){var cartProItem=cartProList[i];if(cartProItem.type=1){if(cartPlugNum<5){var cartProInfo=cartProItem.items[0];cartListHtml+="<li>";cartListHtml+="<div class='proListDb'>";cartListHtml+="<div class='proPic'><a href='http://www.jiuxian.com/goods-"+cartProInfo.goods_id+".html' target='_blank'><img src='"+cartProInfo.goods_thumb+"' width='40' height='40' /></a></div>";
cartListHtml+="<div class='proTit'><a href=http://www.jiuxian.com/goods-"+cartProInfo.goods_id+".html target='_blank'>"+cartProInfo.goods_name+"</a></div>";cartListHtml+="<div class='proPrice''>";cartListHtml+="<p class='proPriceD'>￥"+cartProInfo.goods_price+"</p>";cartListHtml+="<p class='proD'>删除</p></div></div></li>";cartPlugNum+=1}}else{if(cartProItem.type=2){if(cartProItem.items.length>0&&cartPlugNum<5){cartListHtml+="<li>";for(var j=0;j<cartProItem.items.length;j++){var cartProInfo=cartProItem.items[0];if(cartPlugNum<5){cartListHtml+="<div class='proListDb'>";cartListHtml+="<div class='proPic'><a href='http://www.jiuxian.com/goods-"+cartProInfo.goods_id+".html' target='_blank'><img src='"+cartProInfo.goods_thumb+"' width='40' height='40' /></a></div>";cartListHtml+="<div class='proTit'><a href=http://www.jiuxian.com/goods-"+cartProInfo.goods_id+".html target='_blank'>"+cartProInfo.goods_name+"</a></div>";cartListHtml+="<div class='proPrice''>";cartPlugNum+=1}}cartListHtml+="<p class='proPriceD'>￥"+cartProInfo.total_price+"</p>";cartListHtml+="<p class='proD'>删除</p></div></div></li>"}}else{if(cartProItem.type=3){if(cartProItem.items.length>0&&cartPlugNum<5){cartListHtml+="<li>";for(var j=0;j<cartProItem.items.length;j++){var cartProInfo=cartProItem.items[0];if(cartPlugNum<5){cartListHtml+="<div class='proListDb'>";cartListHtml+="<div class='proPic'><a href='http://www.jiuxian.com/goods-"+cartProInfo.goods_id+".html' target='_blank'><img src='"+cartProInfo.goods_thumb+"' width='40' height='40' /></a></div>";cartListHtml+="<div class='proTit'><a href=http://www.jiuxian.com/goods-"+cartProInfo.goods_id+".html target='_blank'>"+cartProInfo.goods_name+"</a></div>";cartListHtml+="<div class='proPrice''>";cartPlugNum+=1}}cartListHtml+="<p class='proPriceD'>￥"+cartProInfo.total_price+"</p>";cartListHtml+="<p class='proD'>删除</p></div></div></li>"}}}}}cartListHtml+="<div class='clear'></div>";if(cartPlugNum>0){$(".cart_plug_pro_list").html(cartListHtml)}else{$(".cart_plug_pro_list").html("您的购物车中还没有商品!")}}jQuery(".carList").show()}else{$(".carList").hide()}}})}$(function(){if($(".searchBg").val()==""){$(".searchBg").val(defaultKey)}$(".searchBg").focus(function(){var sc=$(".searchBg").val();if(sc==defaultKey){$(".searchBg").val("")}});$(".searchBg").blur(function(e){var sc=$(".searchBg").val();if(sc==""){$(".searchBg").val(defaultKey)}});$("body").bind("click",function(e){$(".searchCon").hide()});$(".searchCon ul a,.searchCon").bind("click",function(e){e.stopPropagation()});$(".searchCon").bind("mouseover",function(e){$(".searchCon").show()});$(".searchCon").bind("mouseout",function(e){$(".searchCon").hide()});$(".searchCon ul a").live("mouseover",function(){$(".searchCon ul a").css("background-color","#ffffff");$(this).css("background-color","#ffdfc6")});$(".searchCon ul a").live("mouseout",function(){$(".searchCon ul a").css("background-color","#ffffff")});$(".searchCon .searchClose ").live("click",function(e){$(this).parents(".searchCon").hide();e.stopPropagation()});$(".topCollect p .repCity").mouseover(function(){$(".deli_citybx").show()});$(".deli_city,.deli_icon,.deli_citybx").bind("mouseover",function(e){$(".deli_citybx").show();e.stopPropagation()});$("body").bind("mouseout",function(){$(".deli_citybx").hide()});$(".deli_citylt li p a").click(function(){var pid=$(this).attr("pid");setCookie("user_province",pid,12);$(".deli_citybx").hide();location.reload()});$(".deli_citybx .delcty_close").click(function(){$(".deli_citybx").hide()});$(".webNav").mouseover(function(){$(this).find(".siteNavs").show()}).mouseout(function(){$(this).find(".siteNavs").hide()});$(".toTopBox .toTop,.toTopChange .toTop").click(function(){$("html, body").animate({scrollTop:0},120)});$(function(){$(".popAdBg").show();$(".popAdBg,.indexPopAdIcon").css("display","block");$(".popAdBg,.indexPopAdIcon").stop(true).animate({opacity:1},350);$(".indexPopAd").attr("popState","on")});$(window).bind("resize",function(){var window_width=$(window).width();var width_1=(window_width-1200)/2-10;var width_2=276;if(width_1<width_2){$(".popAdBg").hide();$(".popAdBg,.indexPopAdIcon").stop(true).animate({opacity:0},350,function(){$(".indexPopAdIcon").css("display","none");$(".indexPopAd").attr("popState","off")})}else{$(".popAdBg").show();$(".popAdBg,.indexPopAdIcon").css("display","block");$(".popAdBg,.indexPopAdIcon").stop(true).animate({opacity:1},350);$(".indexPopAd").attr("popState","on")}});$(".topRightM").mouseover(function(){$(this).find(".hd_mobile_list").show()}).mouseout(function(){$(this).find(".hd_mobile_list").hide()});$(".dd").hover(function(){$(this).css("border-left","solid 1px #ffffff");var a=$(this).text();if(a.indexOf("iP")>=0){$(".hd_mobile_pix").show();$(".hd_mobile_pix").find("img").attr("src","http://misc.jiuxian.com/img/hongm.jpg")}else{if(a.indexOf("wa")>=0){$(".hd_mobile_pix").show();$(".hd_mobile_pix").find("img").attr("src","http://img01.jiuxian.com/img1/tit/wap.png")}else{if(a.indexOf("酒仙")>=0){$(".hd_mobile_pix").show();$(".hd_mobile_pix img").attr("src","http://misc.jiuxian.com/img/weixin.jpeg")
}}}},function(){$(".hd_mobile_pix").hide();$(this).css("border-left","solid 1px #ddd")});$(".hd_mobile_pix").mouseover(function(){$(".hd_mobile_list").show();$(this).show()});$(".hd_mobile_pix").mouseout(function(){$(".hd_mobile_list").hide();$(this).hide()});if($("#mainbody").length>0&&$(".hj_main").length==0){$("#nav").show();$(".feedBack").remove();$("#toTop").show()}else{if($(".hj_main").length>0){$(".indexPopAd,.popAdBg").remove();$("#nav").show();$("#toTop").show()}else{$(".indexPopAd,.popAdBg").remove();$("#toTop").show();$("#nav_list,#nav,.menu_eject").mouseleave(function(){$("#nav").hide()});$("#nav_list,.wine_nav_list .seleCenter,#nav,.menu_eject").mouseenter(function(){$("#nav").show()})}}var scrollTop=0;var menuTop=0;var num=0;$(".b").attr({"left":"210px","top":"0"});var iHeightb=0;var h=$(".nav_bg").height()+117;if($(".top_banner").length>0||($(".wine_navbx").length==0&&$("#mainbody").length>0)){h=157+90}window.onresize=function(){menuTop=$(window).height()+scrollTop-h};$("#nav li").mouseenter(function(mevent){scrollTop=$(window).scrollTop();menuTop=$(window).height()+scrollTop-h;var ev=mevent.currentTarget;var oTop=parseInt($(ev).position().top);$(this).addClass("nav_menu_on");num=$("#nav li").index($(ev));$(".menu_eject").hide();$(".menu_eject").eq(num).show();var leftH=$(".menu_eject").eq(num).find(".sub_menu_left").height()+20;$(".menu_eject").eq(num).find(".sub_menu_right").css("height",leftH);iHeightb=parseInt($(".menu_eject").eq(num).css("height"))+2;if(menuTop<iHeightb+oTop){oTop=menuTop-iHeightb;if(oTop<0){oTop=0}}$(".menu_eject").stop().animate({"top":oTop+"px"})});$(".menu_eject").mouseenter(function(){$("#nav li").eq(num).addClass("nav_menu_on");$(".menu_eject").eq(num).show()});$("#nav li").mouseleave(function(mevent){$(".menu_eject").hide();$(this).removeClass("nav_menu_on")});$(".menu_eject").mouseleave(function(){$("#nav li").removeClass("nav_menu_on");$(this).hide()});$("#subscribe_email").focus(function(){var orderEmail=$(this).val();if(orderEmail=="请输入您的Email地址"){$(this).val("")}});$("#subscribe_email").blur(function(){var orderEmail=$(this).val();if(orderEmail==""){$("#subscribe_email").val("请输入您的Email地址")}})});