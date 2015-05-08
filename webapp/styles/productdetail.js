$(document).ready(function(e) {
	var w = $('.toArea').width()+50;
	$('.toArea div').width(w+'px');
	//鼠标滑过地区出来
  	var timer = null;

	$('#summary-stock .text div').eq(0).hover(function(){
		clearTimeout(timer);
		$('.address-x01-china1').show();
		$('#summary-stock .text div').eq(0).find('div').eq(0).show();
	}, function(){
		timer = setTimeout(function(){
			$('.address-x01-china1').hide();
			$('#summary-stock .text div').eq(0).find('div').eq(0).hide();
		}, 100);
	});
	$('.address-x01-china1').hover(function(){
		clearTimeout(timer);
		$(this).show();
		$('#summary-stock .text div').eq(0).find('div').eq(0).show();
	}, function(){
		timer = setTimeout(function(){
			$('.address-x01-china1').hide();
			$('#summary-stock .text div').eq(0).find('div').eq(0).hide();
		}, 100);
	});
	// 点击城市
	$(".detail-area02 a").unbind('click').bind('click', function() {
		var pid = $(this).attr('pid');
		var sibDiv = $(this).parent().parent().parent().find('.detail-other_chlid_area');
		var sibUl = $(this).parent().parent().parent().siblings('.detail-ul-area1');

		sibDiv.each(function(index, element) {
			if($(element).attr('id').substr(7) == pid){
				$(element).show();
			}else{
				$(element).hide();
			}
		});

		sibUl.each(function(index, element) {
			$(element).find('.detail-other_chlid_area').hide();
		});

	});
});
