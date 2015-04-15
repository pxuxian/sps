$(function(){
   // close mini cart 
   $(".close-other,#close-other").click(function(){
      $(".cartmini-box").css("display","none");
   });
});
function buy_now($url, $product_id, $maxgifts, $qty) {
	$price_id = $("input[name='price']:checked").val();
	var buy_num = document.getElementById("buy_num");
	$buy_num = buy_num.value
	if ($buy_num != 1) {
		$num = $buy_num;
	} else {
		$num = 1;
	}
		// if($qty+1>$maxgifts-1){
	// $.getJSON($url+"/web/getjson/"+$product_id,function(data){
	//     var gid=data.order_id;
	//     var gleast=data.gleast;
	//     if($qty+1>gleast-1){
	//         $("#gift"+gid).attr("checked", true);
	//         $("#gift"+gid).attr("disabled", false);
	//     }

	// });
	// }
	to_ttgy_basket($url, $product_id, $price_id, $num, $maxgifts, 'buynow');
}

function to_ttgy_basket($url, $product_id, $price_id, $qty, $maxgifts) {
	if ($('#buy-num-' + $product_id).val() > 0) {
		$qty = $('#buy-num-' + $product_id).val();
	}
	var flag = arguments[5];
		// var is_pro_sales = arguments[6];
	$.post("/basket", {
		product_id : $product_id,
		price_id : $price_id,
		qty : $qty
	}, function(data) {
			if (data == "请先登陆") {
			window.location.href = $url + "/web/login";
			return;
		}
		if (data.length > 3) {
			jAlert(data, "温馨提示");
			return;
		}
		if (flag == 'buynow') {
			$.ajaxSetup({
				cache : false
			});
			$.post("/index.php/basket/cart_sales_update", {}, function(data) {
				var result = eval('(' + data + ')');
				if(result['result']=='succ')
			{
			    $("#total_price").html('￥'+result['total']);
			    $("#overlay_cartnum").html(result['num']);
			    $("#overlay_cartmoney").html('￥'+result['total']);
                            $(".cartmini-box").fadeIn(500);
			}
				var pro_sales_product_id = $(".sales_pro_check[is_checked='checked']").attr("product_id");
				var pro_dales_price_id = $(".sales_pro_check[is_checked='checked']").attr("price_id");
				if (!pro_sales_product_id) {
					//$("#cart").load(location.href + ' #cart>*');
					//$("#total").html(result['total'] + "元");
					//cart_num();
				}
				if ($maxgifts != 0) {
					pro_check_gift($maxgifts, $url, $qty, $price_id, $product_id);
				}
				//check_pro_sales($product_id);
				if (pro_sales_product_id && pro_dales_price_id) {
					add_prosales_to_basket_pro($url, pro_sales_product_id, pro_dales_price_id, $qty);
				}
				if ($(".bind_pro_check[is_checked='checked']")) {
					var bind_pro_check = $(".bind_pro_check[is_checked='checked']");
					var bind_pro_id = new Array();
					bind_pro_check.each(function() {
						bind_pro_id.push($(this).attr('price_id'));
					});
					if (bind_pro_id.length > 0) {
						add_bindsales_to_basket_pro($url, bind_pro_id, $qty);
					}
				}

			});
			 get_cart_list();
			// showPopOut();
			setTimeout("boxFadeOut()",3000);
		} else {
			location.reload();
			//window.location.href=$url+"/order/index/"+$product_id;
		}
		//$(".cart").html(data);

	});
}

function boxFadeOut(){
	$(".cartmini-box").fadeOut(500);
}

function pro_check_gift($maxgifts, $url, $num, $price_id, $product_id) {
	// var obj=document.getElementsByName('pgift');  //选择所有name="'pgift'"的对象，返回数组
	// var obj = document.getElementsByClassName("pgift");
	//var obj=document.getElementsById('.pgift').className;
	//取到对象数组后，我们来循环检测它是不是被选中
	$c = 0;
	var s = '';
	// for (var i = 0; i < obj.length; i++) {
	// 	if (obj[i].checked)
	// 		s += obj[i].value + ',';
	// 	//如果选中，将value添加到变量s中
	// 	if (obj[i].checked)
	// 		$c = $c + 1;
	// }
	//那么现在来检测s的值就知道选中的复选框的值了
	if ($maxgifts < 1) {
		return false;
	};
	if ($c > $maxgifts && $maxgifts != 0) {
		jAlert("您只能选择其中" + $maxgifts + "样赠品", "温馨提示");
		document.execCommand("stop");
	}
	/*
	 if(s==''){
	 if(confirm("您确实不要赠品？")){
	 return false;
	 }else{
	 document.execCommand("stop");
	 }
	 }*/
	$s = s.substr(0, s.length - 1);
	$.post($url + "/basket/sign_gift/", {
		gifts : $s,
		num : $num,
		price_id : $price_id,
		product_id : $product_id
	}, function(data) {
		return false;
	})
	return;
}
function add_prosales_to_basket_pro($url, pro_sales_product_id, pro_dales_price_id, $qty) {

	$.post($url + "index.php/basket/add_prosales_to_basket", {
		product_id : pro_sales_product_id,
		price_id : pro_dales_price_id,
		qty : $qty
	}, function(data) {
		var result = eval('(' + data + ')');
		if (result['result'] == 'succ') {
			$.ajaxSetup({
				cache : false
			});
			$("#cart").load(location.href + ' #cart>*');
			$.post($url + "index.php/basket/cart_sales_update", {
				signedProsales : result['msg']
			}, function(salesdata) {
				var salesresult = eval('(' + salesdata + ')');
				//$("#total").html(salesresult['total'] + "元");
				//cart_num();
				show_mini_cart();
				//check_pro_sales($("#pro_id").val());
			})
		} else {
			jAlert(result['msg'], "温馨提示");
			return;
		}
	});

}
function add_bindsales_to_basket_pro($url, bind_pro_id, $qty) {
	$.post($url + "index.php/basket/add_bindsales_to_basket_pro", {
		price_id : bind_pro_id,
		qty : $qty
	}, function(data) {
		var result = eval('(' + data + ')');
		if (result['result'] == 'succ') {
			$.ajaxSetup({
				cache : false
			});
			$("#cart").load(location.href + ' #cart>*');
			$.post($url + "index.php/basket/cart_sales_update", {
				cart_array : result['msg']
			}, function(salesdata) {
				var salesresult = eval('(' + salesdata + ')');
				$("#total").html(salesresult['total'] + "元");
				//cart_num();
				//check_pro_sales($("#pro_id").val());
			})
		} else {
			jAlert(result['msg'], "温馨提示");
			return;
		}
	});
}


function addnum($url, $id, $qty) {
	var buy_num = document.getElementById("buy_num");
	$buy_num = buy_num.value;
	$buy_num = parseInt($buy_num) + 1;
	buy_num.value = $buy_num;
	//getscore($url, $id, $buy_num);

	// $.getJSON($url+"/web/getjson/"+$id,function(data){
	//     var gid=data.order_id;
	//     var gleast=data.gleast;
	//      if($buy_num+$qty>gleast){
	//        $("#gift"+gid).attr("checked", true);
	//        $("#gift"+gid).attr("disabled", false);
	//    }

	//     });
}

function cutnum($url, $id, $qty) {
	var buy_num = document.getElementById("buy_num");
	$buy_num = buy_num.value;
	if ($buy_num <= 1) {
		return false;
	}
	$buy_num = parseInt($buy_num) - 1;
	buy_num.value = $buy_num;
	//getscore($url, $id, $buy_num);
}


