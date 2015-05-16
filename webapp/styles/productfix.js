// JavaScript Document
/*$(document).ready(function(){
	var topMain=665;//是头部的高度加头部与nav导航之间的距离
	var listnav=$(".detail-js-title");
	$(window).scroll(function(){
		if ($(window).scrollTop()>topMain){//如果滚动条顶部的距离大于topMain则就listnav导航就添加类.listnav_scroll，否则就移除
			listnav.addClass("detail-fix");
		}else{
			listnav.removeClass("detail-fix");
		}
	});
})产品评论简介切换及固定 
*/


$(function(){

    $("#sp-pl").click(function(){
      var mao_height = $("#pro_detail").offset().top;
      console.log(mao_height);
      $("html, body").animate({ scrollTop: mao_height-40 }, 0);
      $("#pro_detail").hide();
      $("#pro_pl_title").hide();
      $("#pro_pl_body").hide();
      $("#pro_pl_body2").show();
	  $(this).addClass("now-js");
	  $(this).siblings().removeClass("now-js");
     
    });
	
	$("#sp-xq").click(function(){
	  $("#pro_detail").show();
      $("#pro_pl_title").show();
      $("#pro_pl_body").show();
      $("#pro_pl_body2").hide();
      var lao_height = $("#pro_detail").offset().top;
      $("html, body").animate({ scrollTop: lao_height-40 }, 0);
	  $(this).addClass("now-js");
	  $(this).siblings().removeClass("now-js");
    });
          
   

  });
  
  
 $(function(){
	  
	var $div_li =$("div.detail-samllpic ul li");
	    $div_li.hover(function(){
			$(this).addClass("now-gray")            
				   .siblings().removeClass("now-gray");  
            var index =  $div_li.index(this);  
			$("div.detail-bigpic > div")   	
					.eq(index).show()   
					.siblings().hide(); 
		})
 });
 
 
	//相册切换，单品详情
	



//大图切换
function showDaTu(src) {
	$("#defaultImg").attr("src", src);
}


