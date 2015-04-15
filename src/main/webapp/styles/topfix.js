$(document).ready(function(){
	if(!$("#listdh")[0]){
		var topMain=$(".all-dhmenu").height()+88//是头部的高度加头部与nav导航之间的距离
		var nav=$("#topdh");
		$(window).scroll(function(){
		if ($(window).scrollTop()>topMain){//如果滚动条顶部的距离大于topMain则就nav导航就添加类.nav_scroll，否则就移除
			nav.addClass("topdh_scroll");
			$(".nav-box-left01 img").show();
		}else{
			nav.removeClass("topdh_scroll");
			$(".nav-box-left01 img").hide();
		}
		});
	}else{
		var listmain=$(".menulist-box").height()+160//是头部的高度加头部与nav导航之间的距离
		var listnav=$("#listdh");
		$(window).scroll(function(){
			if ($(window).scrollTop()>listmain){//如果滚动条顶部的距离大于listmain则就nav导航就添加类.nav_scroll，否则就移除
				listnav.addClass("listdh_scroll");
				$(this).addClass("menulist-show");
				$("#listdh").show();
			}else{
				listnav.removeClass("listdh_scroll");
				$(this).removeClass("menulist-show");
				$("#listdh").hide();
			}
		});
	}
	
})/*列表分类 fix */