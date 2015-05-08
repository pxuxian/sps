// JavaScript Document
 $(document).ready(function() {
	  
	$(".nav-all").hover(function() {
           $(this).parents().find(".nav-all-title i").addClass("hover-nav");
		   $(this).children(".nav-all-class").show();
		   },function(){
			  $(this).parents().find(".nav-all-title i").removeClass("hover-nav");
		      $(this).children(".nav-all-class").hide();
    });/*all menu*/
	
	
	$(".nav-relative").hover(function() {
           $(this).children(".nav-relative a").addClass("now-nav");
		   $(this).children(".nav-relative-a").show();
		   $(this).children(".nav-relative-jiao").show();
		   },function(){
			  $(this).children(".nav-relative a").removeClass("now-nav");
		      $(this).children(".nav-relative-a").hide();
			  $(this).children(".nav-relative-jiao").hide();
    });/*all menu*/
	
	
	$(".nav-mes-cart").hover(function() {
           $(this).children(".nav-all-title i").addClass("hover-nav");
		   $(this).children(".nav-mes-minicart").show();
		   $(this).children(".nav-mes-minicart-green").show();
		   },function(){
			  $(this).children("nav-all-title i").removeClass("hover-nav");
		      $(this).children(".nav-mes-minicart").hide();
			  $(this).children(".nav-mes-minicart-green").hide();
    });/*minicart*/
	
	
	$(".address-x01").hover(function() {
           $(this).children(".nav-all-title i").addClass("hover-nav");
		   $(this).children(".address-x01-china").show();
		   },function(){
			  $(this).children("nav-all-title i").removeClass("hover-nav");
		      $(this).children(".address-x01-china").hide();
    });/*city*/
	
	
		
	$(".img").hover(function() {
	   $(this).children(".big-weibo").show();
	   },function(){
		  $(this).children(".big-weibo").hide();
		
	 });/*erweima*/
	 
	 
	 $(".detail-xx02").hover(function() {
					   $(this).children(".detail-xx02-big").slideDown();
	   },function(){
		  $(this).children(".detail-xx02-big").hide();
		
	 });/*erweima*/
		 
		 

		
 
 
 });
