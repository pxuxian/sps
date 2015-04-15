// JavaScript Document

var modifyMiniCartBuyNum = function(obj, num, id, type, product_id) {
	$url = getHost();
	$url = "http://" + $url + "/index.php";
	var obuy = $('#buy-mini-num-' + id).val();
	if (num > 0) {
		var nbuy = Number(obuy) + Number(num);
		var mini_cart_num = Number($('#cart_number').html()) + Number(num);
	} else {
		var nbuy = obuy - Number(-num);
		var mini_cart_num = Number($('#cart_number').html()) - Number(-num);
	}
	if (nbuy > 0) {
		if (type == 'cart') {
			$.post($url + "/basket/cart_update", {
				qty : nbuy,
				product_id : id,
				type : type,
				goods_id : product_id
			}, function(data) {
				var result = eval('(' + data + ')');
				if (result['result'] == 'succ') {
					if (result['modify_cart_price']) {
						$("#mini_cart_price_" + id).html(
								"￥" + result['modify_cart_price']);
					}
					$("#total_price").html("￥" + result['total']);
					$('#buy-mini-num-' + id).val(nbuy);
					// 修改购物车数量
					$("#cart_number").html(result['num']);
					// 修改满赠
					if (result['extra_money'] <= 0) {
						$('.mini-cart-money').css('display', 'none');
						$('.mini-cart-money').html('');
					} else {
						$('.mini-cart-money').css('display', 'inline-block');
						$('.mini-cart-money').html(result['extra_money_str']);
					}

					// cart_num();

				} else {
                                                                jAlert(result['msg'], '温馨提示');
				}
			})
		} else {
			$('#buy-mini-num-' + id).val(nbuy);
			$('#mini_cart_num').html(' ' + mini_cart_num + ' ');
			$('#buy-num-' + id).val(nbuy);
			// cart_num();
		}
	}
};

// 设置区域
var set_region = function(code) {
	$.post('/web/setregion/' + code, function() {
		location.reload();
	});
}

var getHost = function(url) {
	var host = "null";
	if (typeof url == "undefined" || null == url)
		url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if (typeof match != "undefined" && null != match)
		host = match[1];
	return host;
};

function deleteMiniCartProduct(id) {
	$url = getHost();
	$url = "http://" + $url + "/index.php";
	$.post($url + "/basket/cart_product_delete", {
		price_id : id
	}, function(data) {
		var result = eval('(' + data + ')');
		if (result['result'] == 'succ') {
			get_cart_list();
		} else {
			alert(result['msg']);
		}
	})
}

function get_cart_list() {
	$.ajax({
		type : 'POST',
		url : '/basket/mini_basket_list',
		success : function(data) {
			// 隐藏载入框
			$('#cart_loading').css('display', 'none');
			if (data.success) {
				num = data.num;
				if (num > 0) {
					// 显示购物框、数量
					$('#cart_list').css('display', 'inline-block');
					$('#cart_list').html(data.html);
					// $('#cart_number').css('display', 'inline-block');
					$('#cart_number').html(num);
                    $('#cart_no_product').css('display', 'none');
				} else {
                    $('#cart_list').css('display', 'none');
                    // $('#cart_number').css('display', 'none');
                    $('#cart_number').html(num);
					$('#cart_no_product').css('display', 'inline-block');
				}
				if (data.region_name != "") {
					$('#current_city').html(data.region_name);
					if ($('#detail_curr_area').length!=0){
						$('#detail_curr_area').html(data.region_name);
					}
				} else {
                    set_region(1);
					// $("#pageOverlay").show();
					// $(".welcome-box").show();

				}
				
				if(data.uid>0){
					$('.logined_span').show();
					$('.login_span').hide();
					$('.logined_span .username').html(data.username);
					if(data.user_gift_num){
						$('#user_gift').show();
                                                // $(".nav-mes-cart").css('top','3px');
                                                // $(".nav-mes-cart").css('_top','2px');
						$('#user_gift_num').html(data.user_gift_num);
					}
				}else{
					$('.logined_span').hide();
					$('.login_span').show();
				}
			} else {
                num = data.num;
                $('#cart_list').css('display', 'none');
                $('#cart_number').html(num);
				$('#cart_no_product').css('display', 'inline-block');
			}

		},
		dataType : 'json'
	});
}

function to_list_ttgy_mini_basket($url, $product_id, $price_id, $qty,$maxgifts) {
	var next_type = arguments[6];
	if ($('#buy-num-' + $product_id).val() > 0) {
		$qty = $('#buy-num-' + $product_id).val();
	}
	var flag = arguments[5];
        
        $.post($url + "basket", {
		product_id : $product_id,
		price_id : $price_id,
		qty : $qty
	}, function(data) {
		if (data == "请先登陆") {
			window.location.href = $url + "/web/login";
			return;
		}
		if (data.length > 3) {
			$(".up-down").hide();
			$(".up-down-xiao").hide();
			jAlert(data, '温馨提示');
			return;
		}
		if (flag == 'buynow') {
			$.ajaxSetup({
				cache : false
			});
			$.post($url + "basket/cart_update", {}, function(data) {
				var result = eval('(' + data + ')');
				$("#total_price").html('￥'+result['total']);
                                                   if(result['result']=='succ'){
                                                        $('#overlay_cartnum').html(result['num']);
                                                        $('#overlay_cartmoney').html('￥'+ result['total']);
                                              
                                                        get_cart_list();
                                                        if($maxgifts!=0){
							pro_check_gift($maxgifts,$url,$qty,$price_id,$product_id);
						}
						if(next_type!=1 && next_type!=2){
							$('.cartmini-box').fadeIn(500);
							setTimeout("boxFadeOut()",3000);
						}else if(next_type==2){
							window.location.href = $url + "showcart";
						}
                                                    }else{
                                                       jAlert('添加失败', '温馨提示');
                                                    }
			});
		} else {
			window.location.href = $url + "/order/index/" + $product_id;
		}
	})
}

function pro_check_gift($maxgifts,$url,$num,$price_id,$product_id){
   // var obj=document.getElementsByName('pgift');  //选择所有name="'pgift'"的对象，返回数组    
    // var obj=document.getElementsByClassName("pgift");
    //var obj=document.getElementsById('.pgift').className;
    //取到对象数组后，我们来循环检测它是不是被选中    
    $c=0;
    var s='';    
    // for(var i=0; i<obj.length; i++){    
    //     if(obj[i].checked) s+=obj[i].value+',';  //如果选中，将value添加到变量s中    
    //     if(obj[i].checked) $c=$c+1;
    // }    
    //那么现在来检测s的值就知道选中的复选框的值了    
    if($maxgifts<1){
        return false;
    };
    if($c>$maxgifts && $maxgifts!=0){
        jAlert("您只能选择其中"+$maxgifts+"样赠品","温馨提示");
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
    $s=s.substr(0,s.length-1);
    $.post($url+"/basket/sign_gift/",{gifts:$s,num:$num,price_id:$price_id,product_id:$product_id},function(data){
        return false;
    })
    return;
}

function boxFadeOut(){
    $(".cartmini-box").fadeOut(500);
}

$(document).ready(function() {
        $("body").delegate(".number-add,.shuru-small", 'blur', function() {
            var input_num = $(this).val();
            $(this).val(Math.ceil(input_num));
        });
        $("#back_to_top").click(function() {
            $("html, body").animate({ scrollTop: 0 }, 500);
        });
        var $backToTopFun = function() {
                var st = $(document).scrollTop(), winh = $(window).height();
                (st > 0)? $("#back_to_top").show(): $("#back_to_top").hide();
                //IE6下的定位
                if (!window.XMLHttpRequest) {
                        $("#back_to_top").css("top", st + winh - 166);
                }
        };

        $(window).bind("scroll", $backToTopFun);
        $(function() { $backToTopFun(); });
    
        $(".nav-all").hover(function() {
            $(this).children(".nav-all-title i").addClass("hover-nav");
            $(this).children(".nav-all-class").show();
        },function(){
            $(this).children("nav-all-title i").removeClass("hover-nav");
            $(this).children(".nav-all-class").hide();
        });/*all menu*/
	
	
        $(".nav-relative").hover(function() {
            $(this).children(".nav-relative a").addClass("now-nav");
            $(this).children(".nav-relative-a").show();
            $(this).children(".nav-relative-jiao").show();
        },function(){
            $(this).children(".nav-relative a").removeClass("now-nav");
            $(this).children(".nav-relative-a").hide();
            $(this).children(".nav-relative-jiao").hide();
        });/*all menu*/
	
        $(".nav-mes-one a").hover(function(){
            $(this).css('text-decoration','underline');
        },function(){
            $(this).css('text-decoration','');
        });
	
        $(".nav-mes-cart").hover(function() {
            $(this).children(".nav-all-title i").addClass("hover-nav");
            $(this).children(".nav-mes-minicart").show();
            $(this).children(".nav-mes-minicart-green").show();
        },function(){
            $(this).children("nav-all-title i").removeClass("hover-nav");
            $(this).children(".nav-mes-minicart").hide();
            $(this).children(".nav-mes-minicart-green").hide();
        });/*minicart*/
	
	
        $(".address-x01").hover(function() {
            $(this).children(".nav-all-title i").addClass("hover-nav");
            $(this).children(".address-x01-china").show();
        },function(){
            $(this).children("nav-all-title i").removeClass("hover-nav");
            $(this).children(".address-x01-china").hide();
        });/*city*/
	
        $(".img").hover(function() {
            $(this).children(".big-weibo").show();
        },function(){
            $(this).children(".big-weibo").hide();
         });/*erweima*/

        // 获得购物车
        get_cart_list();

        // 减少购物车数量
        // icon_minus是由ajax产生的，所以要使用此方法加载click事件
        $("#cart_container").delegate('click', '.icon_minus', function() {
            var input = $(this).parent().find('input:first');
	if (parseInt(input.val()) > 1) {
                input.val(parseInt(input.val()) - 1);
	}
        });

        $("#cart_container").delegate('click', '.icon_plus', function() {
	var input = $(this).parent().find('input:first');
	input.val(parseInt(input.val()) + 1);
        });

        $('#search_keyword').keydown(function(e) {
	if (e.which == 13) {
                if ($(this).val().length > 0) {
                    window.location.href = '/web/search/' + $(this).val();
                }
	}
        });

        $('#search_button').click(function() {
                if ($('#search_keyword').val().length > 0) {
                        window.location.href = '/web/search/' + $('#search_keyword').val();
                }
        });

        // 下拉框
        $(".city-name").click(function() {
                $(this).siblings(".city-othername").toggle();
        });

        // 点击城市
        $(".area02 a").click(function() {
                $(".city-name").siblings(".city-othername").hide();
                $(".city-name").attr('region', $(this).attr('region'));
                $(".city-name").html($(this).html());
        });

		//在线支付 验证是否登陆
		$("#to_charge").click(function(){
			$.get("/web/check_user_is_login",function(data){
				if(data==0){
				  $("#pageOverlay").show();
				  $(".loginmini-box").show();
				  $("#jump_url").val('/home/charge');
				}else{
				  location.href='/home/charge';
				  return false;
				}
			});
		});

        //
        $('.city03').click(function() {
                set_region($(".city-name").attr('region'));
        });

        //点击统计
        $('.statis_search #search_button').click(function(){
            var search_keyword = $("#search_keyword").val();
            var position = 0;
            if (search_keyword){
                $.post("/tglog/ctg", {
                        channel : 'search',
                        active : search_keyword,
                        position : position
                }, function(data) {

                });
            }
        });
        $('.statis_search a').click(function(){
            var search_keyword = $(this).html();
            var position = 1;
            if (search_keyword){
                $.post("/tglog/ctg", {
                        channel : 'search',
                        active : search_keyword,
                        position : position
                }, function(data) {

                });
            }
        });
        $('.statis_class ul li a').click(function(){
            var class_name = $(this).html();
            if (class_name){
                $.post("/tglog/ctg", {
                        channel : 'class',
                        active : class_name,
                        position : 0
                }, function(data) {

                });
            }
        });
        $('.statis_topactive a').click(function(){
                $.post("/tglog/ctg", {
                        channel : 'index_topactive',
                        active : $(this).attr('href'),
                        position : $(this).attr('position')
                }, function(data) {

                });
        });
        $('.statis_index_rotation ul li a').click(function(){
               $.post("/tglog/ctg", {
                        channel : 'index_rotation',
                        active : $(this).attr('href'),
                        position : $(this).attr('position')
                }, function(data) {

                });
        });
        $('.statis_index_listproduct ul li a').click(function(){
                var id = $(this).attr('pid');
                var position = $(this).attr('position');
                if (id){
                    $.post("/tglog/ctg", {
                        channel : 'index_listproduct',
                        active : id,
                        position : position
                    }, function(data) {

                    });
                }
        });
        $('.statis_index_hotproduct a').click(function(){
                var id = $(this).attr('pid');
                var position = $(this).attr('position');
                if (id){
                    $.post("/tglog/ctg", {
                        channel : 'index_hotproduct',
                        active : id,
                        position : position
                    }, function(data) {

                    });
                }
        });
	$('.statis_index_media').click(function(){
		var active = $(this).attr('href') ? 'more' : 'index';
               $.post("/tglog/ctg", {
                        channel : 'index_media',
                        active : active,
                        position : $(this).attr('position')
                }, function(data) {

                });
        });
        $('.statis_index_middleactive ul li a').click(function(){
                $.post("/tglog/ctg", {
                        channel : 'index_middleactive',
                        active : $(this).attr('href'),
                        position : $(this).attr('position')
                }, function(data) {

                });
        });
        $('.statis_index_rightactive ul li a').click(function(){
                $.post("/tglog/ctg", {
                        channel : 'index_rightactive',
                        active : $(this).attr('href'),
                        position : $(this).attr('position')
                }, function(data) {

                });
        });
	$('.statis_rightnav ul li a').click(function(){
		var position = $(this).attr('position');
		var active;
		if(position){
			switch(position)
			{
				case '1':
					active="回到顶部";
					break;
				case '2':
					active="客服";
					break;
				case '3':
					active="晒单";
					break;
				 case '4':
					 active="券卡兑换";
					break;
			}
			$.post("/tglog/ctg", {
					channel : 'rightnav',
					active : active,
					position : position
			}, function(data) {

			});
		}
        });
});

function dpg_all_buy(main_product_id,main_price_id,relative_product_ids,relative_price_ids){
	dpg_all_buy_v1(main_product_id,relative_product_ids);
	return false;
	var relative_product_ids = relative_product_ids.split(',');
	var relative_price_ids = relative_price_ids.split(',');
	var main_next_type=1;
	var relative_next_type=1;
	var url = getHost();
	url = "http://" + url + "/";
	to_list_ttgy_mini_basket(url,main_product_id,main_price_id,1,0,'buynow',main_next_type);
	$.each(relative_product_ids,function(i,val){
		if(i==relative_product_ids.length-1){
			relative_next_type = 2;
		}
		relative_product_id = val;
		relative_price_id = relative_price_ids[i];
		to_list_ttgy_mini_basket(url,relative_product_id,relative_price_id,1,0,'buynow',relative_next_type);
	})
}

function dpg_all_buy_v1(main_product_id,relative_product_ids){
	var product_ids = main_product_id+","+relative_product_ids;
	var url = getHost();
        url = "http://" + url + "/";
        $.post(url+"web/ajaxGetPriceIds", {
                product_ids : product_ids
        }, function(data) {
                if(data.statu){
                        var price_ids = data.price_ids;
			var product_ids = data.product_ids;
			product_ids = product_ids.split(',');
        		price_ids = price_ids.split(',');
        		var next_type=1;
        		var url = getHost();
        		url = "http://" + url + "/";
       	 		$.each(product_ids,function(i,val){
                		if(i==product_ids.length-1){
                        		next_type = 2;
                		}
                		product_id = val;
                		price_id = price_ids[i];
                		to_list_ttgy_mini_basket(url,product_id,price_id,1,0,'buynow',next_type);
        		})
                }
        },'json');
}
