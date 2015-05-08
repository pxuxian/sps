// JavaScript Document
$(function() {
	var $slider = $('.slider ul');
	var $slider_child_l = $('.slider ul li').length;
	var $slider_width = $('.slider ul li').width();
	// $slider.width($slider_child_l * $slider_width);

	var slider_count = 0;

	if ($slider_child_l < 5) {
		$('#btn-right').css({
			cursor : 'auto'
		});
		$('#btn-right').removeClass("dasabled");
	}

	$('#btn-right').click(
			function() {
				if ($slider_child_l < 5
						|| slider_count >= Math.ceil($slider_child_l / 5) - 1) {
					return false;
				}

				slider_count++;
				$slider.animate({
					left : '-=' + 845 + 'px'
				}, 'slow');
				slider_pic(slider_count, $slider_child_l);
			});

	$('#btn-left').click(function() {
		if (slider_count <= 0) {
			return false;
		}

		slider_count--;
		$slider.animate({
			left : '+=' + 845 + 'px'
		}, 'slow');
		slider_pic(slider_count, $slider_child_l);
	});

});

function slider_pic(slider_count, $slider_child_l) {
	if (slider_count >= Math.ceil($slider_child_l / 5) - 1) {
		$('#btn-right').css({
			cursor : 'auto'
		});
		$('#btn-right').addClass("dasabled");
		$('#btn-left').css({
			cursor : 'pointer'
		});
		$('#btn-left').removeClass("dasabled");
	} else if (slider_count > 0
			&& slider_count <= Math.ceil($slider_child_l / 5) - 1) {
		$('#btn-left').css({
			cursor : 'pointer'
		});
		$('#btn-left').removeClass("dasabled");
		$('#btn-right').css({
			cursor : 'pointer'
		});
		$('#btn-right').removeClass("dasabled");
	} else if (slider_count <= 0) {
		$('#btn-left').css({
			cursor : 'auto'
		});
		$('#btn-left').addClass("dasabled");
		$('#btn-right').css({
			cursor : 'pointer'
		});
		$('#btn-right').removeClass("dasabled");
	}
}
