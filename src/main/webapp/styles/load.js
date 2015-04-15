/**
 * Created by syt on 14-7-2.
 */
document.write('<script type=\"text/javascript\">' +
    '$(function(){' +
    '$(".area_child").click(function(){' +
    'var pid = $(this).attr("pid");' +
    'var self_obj = $("#region_"+pid);' +
    'if(self_obj.css("display")=="none"){' +
    '$(".other_chlid_area").hide();' +
    'self_obj.show();' +
    '}else{' +
    'self_obj.hide();' +
    '}' +
    '});' +
    '$(".Orchard_1").mouseover(function(e) {' +
    '$(".Orchard_2").show();' +
    '$(".Orchard_1").addClass("fr");' +
    '});' +
    '$(".Orchard_1").mouseout(function(e) {' +
    '$(".Orchard_2").hide();' +
    '$(".Orchard_1").removeClass("fr");' +
    '});' +
    '$("#star").mouseover(function(e) {' +
    '$("#star img").attr("src","/assets/images/bigpic/star.jpg")' +
    '});' +
    '$("#star").mouseout(function(e) {' +
    '$("#star img").attr("src","/assets/images/bigpic/star2.jpg")' +
    '});' +
    '$(".iphone_f1").mouseover(function(e) {' +
    '$(".iphone_f2").show();' +
    '});' +
    '$(".iphone_f1").mouseout(function(e) {' +
    '$(".iphone_f2").hide();' +
    '});' +
    '});</script>');