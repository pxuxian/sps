function getPcStaticArgs(){
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
    var gets = getPcStaticArgs();
    var input_statistics = gets.statistics;
    var input_referrer = document.referrer;
    $.post("/web/do_statistics",{statistics:input_statistics,referrer:input_referrer},function(data){
           
    });  
});
