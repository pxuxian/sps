function is_to_wap(type,tag) {
	var system = {
		win : false,
		mac : false,
		xll : false
	};
	var p = navigator.platform;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	// system.xll = (p == "X11") || (p.indexOf("Linux") == 0);
    if(system.win||system.mac){

    }else{
        var browser={
        versions:function(){ 
                   var u = navigator.userAgent, app = navigator.appVersion; 
                   return {//移动终端浏览器版本信息 
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        linux: u.indexOf('X11') > -1
                    };
                 }()
        }
        if(browser.versions.mobile){
            if(browser.versions.iPad){

            }else if(browser.versions.linux){

            }else{
                var m_url = '';
				switch(type) {
					case 'index':
						m_url = "http://m.fruitday.com";
						break;
					case 'pro':
						m_url = "http://m.fruitday.com/pro/"+tag;
						break;
					case 'cat':
						m_url = "http://m.fruitday.com/pro/cat/"+tag;
						break;
					case 'search':
						m_url = "http://m.fruitday.com/pro/key/"+tag;
						break;
					default:

						break;
				}
				if(m_url!=''){
					window.location.href = m_url;
				}
            }
            
        }
    }
}