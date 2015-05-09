function isMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        var str = window.location + "";
        if (str.indexOf("http://www.jiuxian.com/goods") != -1) {
            var str1 = str.split(".");
            var str2 = str1[2].split("-");
            window.location = "http://m.jiuxian.com/goods/view/" + str2[1]
        } 
	     else if(str.indexOf("http://sale.jiuxian.com/two/index-418.htm") != -1 ){
		        
	    	 window.location.href = "http://t.cn/RvoK2Jb";
		}else if(str.indexOf("http://sale.jiuxian.com/zmqt/zmqt_index.htm") != -1 ){
		}else if(str.indexOf("http://special.jiuxian.com/topic/zhuanti/2015/yxedm/yxtm/indexzn.html") != -1 ){
		}else if(str.indexOf("http://special.jiuxian.com/topic/zhuanti/2015/yxedm/yxtm/index.html") != -1 ){
		}else if(str.indexOf("http://special.jiuxian.com/topic/vote/") != -1 ){
		}
		else if(str.indexOf("http://sale.jiuxian.com/zmqt/signUp.htm") != -1){
			alert("赶紧用电脑登陆以下网址http://t.cn/RZcMY8P");
		}
		else {
				window.location.href = "http://m.jiuxian.com";
			}		
	}
}