$(function() {
	$(".boxy").boxy();
	get_reach_recommend();
});

function update_page($url) {
	$.ajaxSetup({
		cache : false
	});
	$(".shopping-main").load(location.href + ' .shopping-main>*');
	$(".huangou-con").load(location.href + ' .huangou-con>*');
	$(".add-cart-right").load(location.href + ' .add-cart-right>*')
	// getSale();
	get_reach_recommend();
	// basketTotalPrice($url);
}

function update_basket_cut($url, $id, $value, $maxgifts, $where_opt) {
	var basketnum = document.getElementById("basketnum_" + $id).value;
	$value = basketnum - 1;
	if ($value > 0) {
		$.post($url + "basket/basket_update/", {
			id : $id,
			qty : $value,
			maxgifts : $maxgifts,
			where_opt : $where_opt
		}, function(data) {
			if (data) {
				jAlert(data, "温馨提示");
			} else {
				// location.reload();
				document.getElementById("basketnum_" + $id).value = $value;
				update_page($url);
			}
		})
	}
}

function del_basket($url, $id) {
	$.post($url + "/basket/basket_del/", {
		id : $id
	}, function(data) {
		if (data) {
			jAlert("请先取消使用的抵扣再删除。", "温馨提示");
			return;
		}
		update_page($url);
		// location.reload();
	})
}

function basketTotalPrice($url) {
	$.post($url + "/basket/basket_total_price/", {
		url : $url
	}, function(data) {
		$("#basketListTotal").html(data);
	});
}

function update_basket_add($url, $id, $value, $maxgifts, $where_opt) {
	var basketnum = document.getElementById("basketnum_" + $id).value;
	$value = parseInt(basketnum) + 1;
	$.post("/basket/basket_update/", {
		id : $id,
		qty : $value,
		maxgifts : $maxgifts,
		where_opt : $where_opt
	}, function(data) {
		if (data) {
			jAlert(data, "温馨提示");
		} else {
			document.getElementById("basketnum_" + $id).value = $value;
			update_page($url);
		}
	})
}

function get_reach_recommend() {
	$
			.post(
					"/basket/reach_gift_recommend",
					{},
					function(data) {
						var json = eval("(" + data + ")");
						if (json['result'] != 'empty') {
							$("#money_upto_gift").remove();
							var str = '<div id="money_upto_gift" class="add-cart-left01" style="width:205px;margin-right:5px;"><ul><li class="add-zengp">满'
									+ json.reach_money
									+ '元赠'
									+ json.gift
									+ '<br />还差<span class="red">'
									+ json.space
									+ '</span>元</li><li><img src="'
									+ json.gift_photo
									+ '" width="60" /></li></ul></div>';
							$(".add-cart-left").append(str);
						} else {
							$("#money_upto_gift").remove();
						}
					});
}

function update_basket_sales_cut($url, $id, $value, $maxgifts, $where_opt) {
	var basketnum = document.getElementById("sales_basketnum_" + $id).value;
	$value = basketnum - 1;
	if ($value > 0) {
		$
				.post($url + "index.php/basket/basket_sales_update/", {
					id : $id,
					qty : $value,
					maxgifts : $maxgifts,
					where_opt : $where_opt
				},
						function(data) {
							if (data) {
								jAlert(data, "温馨提示");
							} else {
								// location.reload();
								document.getElementById("sales_basketnum_"
										+ $id).value = $value;
								update_page($url);
							}
						})
	}
}

function update_basket_sales_add($url, $id, $value, $maxgifts, $where_opt) {
	var basketnum = document.getElementById("sales_basketnum_" + $id).value;
	$value = parseInt(basketnum) + 1;
	$.post($url + "index.php/basket/basket_sales_update/", {
		id : $id,
		qty : $value,
		maxgifts : $maxgifts,
		where_opt : $where_opt
	}, function(data) {
		if (data) {
			jAlert(data, "温馨提示");
		} else {
			document.getElementById("sales_basketnum_" + $id).value = $value;
			update_page($url);
		}
	})
}

function del_sales_basket($url, $id) {
	$.post($url + "index.php/basket/basket_sales_del/", {
		id : $id
	}, function(data) {
		if (data) {
			jAlert("请先取消使用的抵扣再删除。", "温馨提示");
			return;
		}
		update_page($url);
	})
}

function null_basket($url) {
	$
			.post(
					$url + "/basket/null_basket/",
					{
						url : $url
					},
					function(data) {
						$(".shopping-list")
								.html(
										"<h2 align='center' style='border:0;'>您购物车里还没有商品<br><a href='/'><img src='/images/gouwuche.jpg'/></a></h2>");
						$(".shopping-jiesuan").hide();
					})
}

function add_prosales_to_basket($url, $product_id, $price_id, $qty) {
	$.post($url + "index.php/basket/add_prosales_to_basket", {
		product_id : $product_id,
		price_id : $price_id,
		qty : $qty
	}, function(data) {
		var result = eval('(' + data + ')');
		if (result['result'] == 'succ') {
			// window.location.href=$url+"showcart/";
			$("#pageOverlay").hide();
			$(".oneyuan-hg-box").hide();
			update_page($url);

		} else {
			jAlert(result['msg'], "温馨提示");
			return;
		}
	})
}

function to_ttgy_basket($url, $product_id, $price_id, $qty, $maxgifts) {
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
		update_page($url);
	})
}

function cart_add_to_basket($url, $product_id, $price_id) {
	$.post($url + "basket", {
		product_id : $product_id,
		price_id : $price_id,
		qty : 1
	}, function(data) {
		if (data) {
			jAlert(data, "温馨提示");
		} else {
			update_page($url);
		}
	})
}

// 设置区域
var set_region = function(code) {
	$.post('/web/setregion/' + code, function() {
		location.reload();
	});
}
// function getSale()
// {
// $.get('/showcart/sales', function(data) {
// if( data > 1 )
// {
// $("#sale").html("¥ "+data);
// }
// else
// {
// $("#sale").parent().hide();
// }
// })
// }
