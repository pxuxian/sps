(function(){
    if(document["location"].protocol === "http:"){
    	//百度
        var a = new Image;
        a.src = "http://cm.pos.baidu.com/pixel?dspid=8026760&ext_data=mapping";
        a.style.width = '1px';
        a.style.height = '1px';
    }
})();