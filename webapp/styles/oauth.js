function getArgs(){
    var args = {};
    var match = null;
    var search = decodeURIComponent(location.search.substring(1));
    var reg = /(?:([^&]+)=([^&]+))/g;
    while((match = reg.exec(search))!==null){
        args[match[1]] = match[2];
    }
    return args;
}

$(function(){
    var gets = getArgs();

    var service = gets.service;
    var time =  gets.time;
    var mobile =  gets.mobile;
    var from =  gets.from;
    var sign =  gets.sign;
    $.post("/web/do_oauth_login",{service:service,time:time,mobile:mobile,from:from,sign:sign},function(data){
           
    });  
});