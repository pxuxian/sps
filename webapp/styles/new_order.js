function cache_area() {
    var id = $('#area').val();
    $.post("/index.php/order/cache_area",{id:id},function(data){});
}
function getArea($type) {
    if($type == "city") {
        var id = $("#province").val();
    }else {
        var id = $("#city").val();
    }
    $.post("/index.php/order/ydps_address",{id:id,type:$type},function(data){
            var objs = eval(data);
            if($type == "city") {
            giveCity(objs);
            }else{
            giveArea(objs);
            }
    });
}

function giveCity(obj) {
    var html = "<option>-- 请选择 --</option>";
    for (x in obj){
        html += "<option value="+obj[x].id+">"+obj[x].name+"</option>";
    }
    $("#city").html(html);
}

function giveArea(obj) {
    var html = "<option>-- 请选择 --</option>";
    for (x in obj){
        html += "<option value="+obj[x].id+">"+obj[x].name+"</option>";
    }
    $("#area").html(html);
}
function isMobel(value)
{
    if(/^1\d{10}$/g.test(value)){
                return true;
            }else{
                return false;
            }
}

function changeDate($url,$area,refresh){
    if($("#is_2to3day_hidden").val()){
      var send_date = 'after2to3days';
      var send_time = '';
    }else if(!refresh){
      var send_date = $('#shtime').val();
      var send_time = $('#stime').val();  
    }else{
      var send_date = '';
      var send_time = '';
    }
    if($(".get_msg:checked").val()=='true'){
      var msg_value = $(".tx-liuyan").val();
    }else{
      var msg_value = '';
    }
    if($(".get_hk:checked").val()=='true'){
      var hk_value = $(".tx-heka").val();
    }else{
      var hk_value = '';
    }
    $.post("/order/genSendTimeCopy/",{date:send_date,time:send_time,is_refresh:refresh,msg:msg_value,hk:hk_value},function(data){
            var is_send_wd = $("#is_2to3day_hidden").val();
            if(!is_send_wd){
              var send_time_obj = $("#"+send_date+"-"+send_time).parents("dd");
              if(!send_time_obj.length){
                var send_time_obj = $("#"+$("#sFdate_hidden").val()+"-"+$("#sFtime_hidden").val()).parents("dd");
              }
              var myDate = new Date();
              var sende_date_v = '2015'+'-'+send_time_obj.attr('datev')+' '+send_time_obj.attr('timev');

              $("#display_sendtime").html(sende_date_v);
              $("#check_send_data").html(sende_date_v);
            }else{
              $("#display_sendtime").html($("#FsendTime_hidden").val());
              $("#check_send_data").html($("#FsendTime_hidden").val());
            }

            if($(".get_msg:checked").val()=='true'){
              var msg_val = $(".tx-liuyan").val();
              $("#display_msg").html(msg_val);
              $(".msg").val(msg_val);
            }

            if($(".get_hk:checked").val()=='true'){
              var hk_val = $(".tx-heka").val();
              $("#display_hk").html(hk_val);
              $(".hk").val(hk_val);
            }

            if(!$("#paym").val() && !refresh){
              $(".user-message").show();
              $(".user-enter").hide();
              $(".user-time").show();
              $(".user-tienter").hide();
              $(".user-payment").hide();
              $(".user-payenter").show();
            }
            change_update_btn();
            checkout_detail($url);
            // filter_before_submit();
            if(data=="60"){
                jAlert("您购买的商品低于60元将无法为您配送。")
            }else if(data=="200"){
                jAlert("您购买的商品低于200元将无法为您配送。")
            }else if(data=="300"){
                jAlert("您购买的商品低于300元将无法为您配送。")
            }else if(data=='hk_too_long'){
              $("#mod-time a").click();
              jAlert("您填写的贺卡内容过长，请控制在50个字以内。");
            }
            // window.location.reload();
    });
}

function update_pay($url){
    $pay_parent_id =  $(".pay_parent_id:checked").val();
    var pay_without_sms = $("#pay_without_sms_hidden").val();
    if(pay_without_sms=='false'){
    if($pay_parent_id==5 && $("#mverify").val()==''){
      jAlert('余额支付需要填写验证码','温馨提示');
      return ;
    }
    }
    if ($pay_parent_id){
        if ($pay_parent_id == 1 || $pay_parent_id == 2 || $pay_parent_id==5){
            $pay_id =  "0";
        }else{
            $pay_id =  $(".pay_id_"+$pay_parent_id+":checked").val();
        }
        if ($pay_id){
            $.ajax({
                type: "POST",
                url: $url+"/order/selectPay_copy",
                data: "url="+$url+"&pay_parent_id="+$pay_parent_id+"&pay_id="+$pay_id,
                dataType:"json",
                success: function(msg){
                    if(msg.msg == '1') {
                        $('#verify').html('帐户冻结，禁止帐户余额支付。');
                        jAlert('帐户冻结，禁止帐户余额支付。',"温馨提示");
                        return;
                    }
                    else if(msg.msg == '2') {
                        jAlert('请先登陆。',"温馨提示");
                        return;
                    }else if(msg.msg == '3') {
                        jAlert('充值卡不能使用余额支付。',"温馨提示");
                        return;
                    } else if(msg.msg == '4') {
                        jAlert('未通过手机验证，不能选择此项支付',"温馨提示");
                        return;
                    } else if(msg.msg == '5'){
                        jAlert(msg.product_name+'暂不支持线下支付','温馨提示');
                        return;
                    }else{
                      var pay_msg = msg;
                      $(".user-payment").show();
                      $(".user-payenter").hide();
                      $(".user-payment p").html(pay_msg);
                      
                        window.location.reload();
                    }
                }
            }); 
        }
        else{
            jAlert("请选择付款方式","温馨提示");
            return false;
        }
    }else{
        jAlert("请选择付款方式","温馨提示");
        return false;
    }

}

function check_pay_id($parent_id,$object){
    if($object.value==10){
        jAlert("您选择了提货券支付,将不赠送赠品","温馨提示");
    }else if($parent_id==4 && $object.value==3){
        jAlert("请确认您使用的ok卡类型，新版红色ok卡暂不支持","温馨提示");
    }else if ($parent_id==4 && $object.value==11){
        jAlert("请确认您使用的券卡类型，充值券请先<input onclick=\"javascript:window.location.href='/web/ucenter/charge'\" value=\"充值\" type=\"button\">","温馨提示");
    }else if ($parent_id==4 && $object.value==7){
        jAlert("红色储值卡已升级，请联系客服更换使用！","温馨提示");
    }
    $paret = $parent_id-2;
    if ($object.checked){
        $(".pay_parent_id:eq("+$paret+")").attr("checked","true");
    }else{
        $(".pay_parent_id:eq("+$paret+")").attr("checked","false");
    }
    $(".now-b").removeClass();
    if($parent_id==3){
      $($object).parent().addClass('now-b');
    }
}

  function show_verify($parent_id){
    $url=getHost();
    $url="http://"+$url+"/index.php";
    if($parent_id=="5"){
        $.post($url+"/order/checkCanPay",{},function(data){
            if(data == "yes"){
                $('#submit_pay_bt').show();;
                $('#submit_pay').hide();
            }else{
                $('#submit_pay_bt').hide();;
                $('#submit_pay').show();
            }
        })
        $.post($url+"/syncpay/check_acount",{},function(data){
            if(data=="freeze") {
                $("#submit_pay").html("由于帐户金额异常，该帐户已经冻结，不能使用帐户余额支付，请联系客服。");
                jAlert("由于帐户金额异常，该帐户已经冻结，不能使用帐户余额支付，请联系客服。","温馨提示");
            }
        });
        $('#verify').show("slow");
    }else{
        $('#verify').hide("slow");
        $('#submit_pay_bt').show();;
        $('#submit_pay').hide();
    }
    $("input[name='pay_id']").attr('checked', false);
}

var getHost = function(url) {
    var host = "null";
    if(typeof url == "undefined"
            || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if(typeof match != "undefined"
            && null != match)
        host = match[1];
    return host;
}

function use_jf($url){
    $user_jf =  $.trim($("#user_jf").val());
    $.ajaxSetup ({cache:false});
    $.post("/order/user_jf",{user_jf:$user_jf},function(data){
        if (data =='ok'){
            $("#jf_use").load(location.href + " #jf_use>*");  
            checkout_detail($url);
        }else{
            $("#jfmsg").html(data)
        return false;
        }
    })
}
function del_jf($url){
    $.ajaxSetup ({cache:false});
    $.post($url+"/order/del_jf",{url:$url},function(data){
        $("#jf_use").load(location.href + " #jf_use>*");
        $("#jfmsg").load(location.href + " #jfmsg>*");  
        checkout_detail($url);
    })
}

function del_card($url){
    $.ajaxSetup ({cache:false});
    $.post($url+"/order/del_card",{url:$url},function(data){
        $("#card_use").load(location.href + ' #card_use>*');
        checkout_detail($url);
        // basket($url);
    })
}
function user_card($url){
    $card_number =  $.trim($("#card_number").val());
    $.ajaxSetup ({cache:false});
    $.post($url+"/order/user_card",{card_number:$card_number},function(data){
        if (data =='ok'){
            $("#card_use").load(location.href + ' #card_use>*');
            checkout_detail($url);
            // basket($url);
        }else{
            $("#cardmsg").html(data);
            $("#cardmsg").css('height','25px');
            return false;
        }
    })
}

function select_user_card(obj){
    $card_number =  $(obj).val();
    $.ajaxSetup ({cache:false});
    $.post("/order/user_card",{card_number:$card_number},function(data){
        if (data =='ok'){
            $("#card_use").load(location.href + ' #card_use>*');
            checkout_detail('');
            // basket($url);
        }else{
            $("#cardmsg").html(data);
            $("#cardmsg").css('height','25px');
            return false;
        }
    })
}

function checkout_detail($url){
    $.ajaxSetup ({cache:false});
    $.post("/order/checkout_detail/",{},function(data){
      var result = eval('('+data+')');
      $(".user-table-list").load(location.href + " .user-table-list");
      $("#checkout_jf").html("－"+result['jf_money']);
      $("#checkout_card").html("－"+result['card_money']);
      $("#checkout_method").html("¥"+result['method_money']);
      $("#total_money").html("¥"+result['total_money']);
      $("#money_deduction .jisuan").html("－¥"+result['money_deduction']);
      $("#cart_count").html(result['cart_qty']+" 件");
    })
}

function del_addr($url,$id){
    $.post($url+"/order/delAddr/",{id:$id},function(data){
        // if(data==$id){
            window.location.reload();
        // }
        // $.post($url+"/order/Addr/",{},function(data){
        //     $("#address").html(data);
        // })
    })
}

function default_addr($url,$id){
    $.post($url+"/order/defaultAddr/",{id:$id},function(data){
        $(".order-default-addr").remove();
        $("#check_address_"+$id).parent("span").after('<span class="order-default-addr">默认</span>');
        // '<span class="order-default-addr">默认</span>'
    })
}
function enable_button2($url){
  var i = 30; 
  var time_cut_obj = setInterval(function() {  
      if(i -- > 0) {  
          $("#bt").val("还剩余"+ i + "秒");  
          $("#bt").attr("disabled","true"); 
      } else {  
          $("#bt").val("再次获取");  
          $("#bt").removeAttr("disabled"); 
          clearInterval(time_cut_obj);
      }     
  }, 1000);   
}
var time=500;
function enable_button(){
    var bt=document.getElementById("bt");
    if(time>0){
        bt.value="还剩余"+time+"秒";
        bt.disabled="true";
        time=time-1;
        timeout=window.setTimeout(enable_button,1000);
    }else{
        bt.value="发送验证码";
        bt.disabled="";
        window.clearTimeout(timeout);
    }
}

function send_code($url,$type){
        if($type=="")
        {
            $("#check").show();
        }
        $mobile = $.trim($("#mobile").val());
    $.post($url+"/order/send_code",{url:$url,type:$type,mobile:$mobile},function(data){
        if (data =='ok'){
          jAlert('验证码已经发送，请注意查收。',"温馨提示")
        //$(".checkcode").html(data);  
          return false;
        }else{
          jAlert(data,"温馨提示");
        return false;
        }
    })  
}

function check_code($url,$type,$code){
        var note_ok = "<img src='/img/note_ok.gif'/>";
        var note_no = "<img src='/img/stop_zxw.gif'/>";
         if($type!="")
         {
             $check_code = $.trim($("#code").val());
         }
         else
         {
             $check_code =  $.trim($("#mverify").val());
         }
     $.post($url+"/order/check_code",{check_code:$check_code,type:$type},function(data){
                 if (data =='ok'){
                     $("#verify").html("验证成功，请保存支付方式");
                     $("#verify").css("color","red");
                     $('#submit_pay').hide();
                     $('#submit_pay_bt').show();
                 }else if(data == 'deduction'){
                    use_money_deduction($("#site_url_hidden").val());
                 }else if(data == 'can' && $check_code !=''){
                     $('.password').show();
                     $('#code_tips').html('<span class=green>验证成功请输入密码。</span>');
                     $('#code_note').html(note_ok);
                 }else{
                     if($type!=='') {
                         $('#code_tips').html('<span class=red>请输入正确验证码。</span>');
                         $('#code_note').html(note_no);
                     }
                     else {
                        jAlert(data,"温馨提示");
                     }
                     return false;
                 }
            })  
}


function change_user_address(){
    $(".close").click();
    $("#mod-address a").click();
    // $("#boxy").click();
}

function del_products(del_proids){
    $(".close").click();
    setTimeout(function() {
        $.post("/order/del_products",{del_proids:del_proids},function(data){
            if(data=='ok'){
              location.reload();
            }
        });
    }, 500);

    
}

function to_use_money_deduction(){
  $("#check_money_deduction").show('slow');
}

function use_money_deduction(){
    $.ajaxSetup ({cache:false});
    $.post("/order/use_money_deduction",{},function(data){
        var result = eval('('+data+')');
        if (result['result'] == 'succ'){
            var cancel = "<input type='button' onclick='javascript:del_money_deduction();' value='取消抵扣'></input>";
            $("#use_money_deduction").html('帐户余额已抵扣¥'+result['msg']+'，您可以'+cancel);
            $("#money_deduction").show();
            $("#check_money_deduction").hide();
            var site_url_hidden = $('#site_url_hidden').val();
            checkout_detail(site_url_hidden);
        }else{
          $("#money_deduction_msg").html(result['msg']);
        return false;
        }
    })
}

function del_money_deduction(){
  $.ajaxSetup ({cache:false});
  $.post("/order/del_money_deduction",{},function(data){
        var use = $("#acount_money_hidden").val()+"，无法支付订单。";
        var pay_without_sms = $("#pay_without_sms_hidden");
        use +="您可以";
        use +="<input type='button' onclick='javascript:window.location.href=\"/web/ucenter/charge/"+$("need_to_charge_hidden").val()+"\"' value='去充值'></input>";
        use +="或者";
        if(pay_without_sms=='false'){
        use +="<input type='button' onclick='javascript:to_use_money_deduction();' value='抵扣相应金额'></input>";
      }else{
        use +="<input type='button' onclick='javascript:use_money_deduction();' value='抵扣相应金额'></input>";
      }
        use +='<span id="money_deduction_msg" style="color:red;"></span>';
        $("#use_money_deduction").html(use);           
        $("#money_deduction").hide();
        var site_url_hidden = $('#site_url_hidden').val();
        checkout_detail(site_url_hidden);
    })
}

function change_update_btn(){
  if($(".user-enter").css('display')!='none'){
      $("#mod-time").html("<span>如需修改，请先保存收货人信息</span>");
      $("#mod-money").html("<span>如需修改，请先保存收货人信息</span>");
      $(".submit_error").show();
      $(".submit_error span").html('<a href="#user-enter" style="color:#005EA7;">收货人信息</a>');
      $("#order_submit_button").css("background-color","gray");
   }else if($(".user-tienter").css('display')!='none'){
      $("#mod-address").html("<span>如需修改，请先保存配送时间</span>");
      $("#mod-money").html("<span>如需修改，请先保存配送时间</span>");
      $(".submit_error").show();
      $(".submit_error span").html("配送时间");
      $(".submit_error span").html('<a href="#user-tienter" style="color:#005EA7;">配送时间</a>');
      $("#order_submit_button").css("background-color","gray");
   }else if($(".user-payenter").css('display')!='none'){
      $("#mod-address").html("<span>如需修改，请先保存支付方式</span>");
      $("#mod-time").html("<span>如需修改，请先保存支付方式</span>");
      $(".submit_error").show();
      $(".submit_error span").html('<a href="#user-payenter" style="color:#005EA7;">支付方式</a>');
      $("#order_submit_button").css("background-color","gray");
   }else{
      $("#mod-address").html('<a href="javascript:void(0);"> [修改]</a>');
      $("#mod-time").html('<a href="javascript:void(0);"> [修改]</a>');
      $("#mod-money").html('<a href="javascript:void(0);"> [修改]</a>');
      $(".submit_error").hide();
      $("#order_submit_button").css("background-color","#669933");
   }
}

  $(document).ready(function() {
    
     $(".add-jifen").click(function(){
     $(this).parents().find(".modify-box-jifen").toggle();
     $(this).toggleClass("add-jifen-huan");  
     }) 
   
   $(".add-dikou").click(function(){
     $(this).parents().find(".modify-box-dikou").toggle();
     $(this).toggleClass("add-dikou-huan");    
     })  
   
   $(".add-heka").click(function(){
     $(this).parents().find(".modify-box-heka").toggle();
     $(this).toggleClass("add-heka-huan");     
     }) 
   
   $(".add-liuyan").click(function(){
     $(this).parents().find(".modify-box-liuyan").toggle();
     $(this).toggleClass("add-liuyan-huan");     
     })    
   
   $(".add-fapiao").click(function(){
     $(this).parents().find(".modify-box-fapiao").toggle();
     $(this).toggleClass("add-fapiao-huan");     
     })  
   
   $("body").delegate("#mod-address a", 'click', function() {
     $(this).parents().find(".user-message").hide();
     $(this).parents().find(".user-enter").show();
      $(".user-time").show();
      $(".user-tienter").hide();
      $(".user-payment").show();
      $(".user-payenter").hide();
     if($("#old_addr")){
        $("#check_address_"+$("#old_addr").html()).attr("checked","checked");
        $("#check_address_"+$("#old_addr").html()).parent("span").siblings().slice(-3).css("display","");
     }else{
        $("#check_address_0").attr("checked","checked");
        $("#check_address_0").parent("span").siblings().slice(-3).css("display","");
     }
     change_update_btn();
     }) 
   $("#save-address").click(function(){
     $(this).parents().find(".user-message").show();
     $(this).parents().find(".user-enter").hide();
     change_update_btn();
     })   

   $("body").delegate("#mod-money a", 'click', function() {
     var addr = $("#addr_hidden").val();
     if(!addr) {
         $("#user-enter").show();
         $("#addr_notice").html("请先保存送货地址");
         return;
     }
     $(this).parents().find(".user-payment").hide();
     $(this).parents().find(".user-payenter").show();
     $(".user-message").show();
      $(".user-enter").hide();
      $(".user-time").show();
      $(".user-tienter").hide();
      change_update_btn();
     }) 
   // $("#save-money").click(function(){
   //   $(this).parents().find(".user-payment").show();
   //   $(this).parents().find(".user-payenter").hide();
   //   }) 

   $(".user-enter-close img").click(function(){
      $(".user-message").show();
      $(".user-enter").hide();
   });

    $(".enter01 ul li").hover(function(){
      $(this).addClass('now-hover');
    },function(){
      $(this).removeClass('now-hover');
    }); 



    $("#check_address_0").change(function(){
      $("#new-address").show();
      $(".editaddress").hide();
      $(".edit-address").remove();
      $.post("/order/Addr_copy/",{},function(data){
        var area_option = eval('('+data+')');
        $("#new-address .area_option").html(area_option);
      });
    }); 

    $(".edit-addr").change(function(){
      $("#new-address").hide();
    });

    $(".enter01 ul li .edit-addr").change(function(){
      $(".editaddress").hide();
      $(".edit-address").remove();
      $("#editaddress_"+$(this).val()).show();
      $("#deleteaddress_"+$(this).val()).show();      
      $("#defaultaddress_"+$(this).val()).show();      
    });

    $(".edit_address").click(function(){
      // $(this).parents('li').children('.name').html('修改地址');
      // $(this).parents('li').children('.address').remove();
      $(".editaddress").hide();
      var id = $(this).parents('li').children('.address_id').html();
      var name = $(this).parents('li').children('.name').html();
      var address = $(this).parents('li').children('.address').html();
      var mobile = $(this).parents('li').children('.mobile').attr('val');
      var telephone = $(this).parents('li').children('.telephone').html();
      var obj = $(this);
      $.post("/index.php/order/editAddr_copy/",{id:id},function(data){
        var area_option = eval('('+data+')');
        var insert_html = '<div class="new-address edit-address" id="edit_address_div"><ul><li><span class="lable"><span class="red">*</span>收  货 人：</span><span><input type="text" class="edit_name" value="'+name+'"/></span></li><li><span class="lable"><span class="red">*</span>选择地区：</span><span>'+area_option+'</span></li><li><span class="lable"><span class="red">*</span>详细地址：</span><span><input type="text" style="width:300px;" class="address_edit" value="'+address+'"/></span></li><li><span class="lable"><span class="red">*</span>手机号码：</span><span><input type="text" class="edit_mobile" value="'+mobile+'" /></span>或固定电话：<span><input type="text" style="width:120px;" class="edit_tel" value="'+telephone+'"></span>两者至少填一项</li></ul></div>';
        var in_li = obj.parents('li');
        $(insert_html).insertAfter(in_li);
      });
    });

  $(".delete_address").click(function(){
    var id = $(this).parents('li').children('.address_id').html();
    del_addr($("#site_url_hidden").val(),id);
  });

  $(".default_address").click(function(){
    var id = $(this).parents('li').children('.address_id').html();
    default_addr($("#site_url_hidden").val(),id);
  });

    $("#address_sumbit").click(function(){
      var input_obj = $("input[class^='check_address']:checked");
      var id = input_obj.val();
      if(id==0){
        var name = $("#new-address .edit_name").val();
        var province = $("#new-address #province").val();
        var city = $("#new-address #city").val();
        var area = $("#new-address #area").val();
        var address = $("#new-address .address_edit").val();
        var mobile = $("#new-address .edit_mobile").val();
        var tel = $("#new-address .edit_tel").val();
      }else if($("#edit_address_div")[0]){
        var name = $("#edit_address_div .edit_name").val()?$("#edit_address_div .edit_name").val():'';
        var province = $("#edit_address_div #province").val();
        var city = $("#edit_address_div #city").val();
        var area = $("#edit_address_div #area").val();
        var address = $("#edit_address_div .address_edit").val();
        var mobile = $("#edit_address_div .edit_mobile").val();
        var tel = $("#edit_address_div .edit_tel").val();
      }else{
        var parent_li = input_obj.parents('li');
        var name = parent_li.children('.name').html();
        var province = parent_li.children('.province').html();
        var city = parent_li.children('.city').html();
        var area = parent_li.children('.area').html();
        var address = parent_li.children('.address').html();
        var mobile = parent_li.children('.mobile').html();
        var tel = parent_li.children('.telephone').html();
      }
      if(isNaN(province) || isNaN(city) || isNaN(area)){
        jAlert("请选择完整的配送地区","温馨提示");
        return;
      }
      if(!isMobel(mobile) && name!="" && tel==''){
        jAlert("请填写正确的手机号码","温馨提示");
        return;
      } 

      $.post("/index.php/order/saveAddr_copy",{id:id,province:province,city:city,area:area,address:address,name:name,mobile:mobile,tel:tel},function(data){
          if(data=='0'){
              jAlert("请选注册或登陆。","温馨提示");
              window.location.href="/index.php/web/login";
          }else if(data=='1'){
              jAlert("请选择配送地区。","温馨提示");
              return;
          }else if(data=='2'){
              jAlert("请完善地址。","温馨提示");
              return;
          }else if(data=='3'){
              jAlert("您选择的收货地址目前不能配送，请重新完善地址","温馨提示");
              var now_id = $(".check_address:checked").val();
              $("#editaddress_"+now_id+" a").click();
              return;
          }else{
              var area_option = eval('('+data+')');
              // console.log(area_option);
              // $url=getHost();
              // $url="http://"+$url+"/index.php";
              // checkout_detail($url);
              window.location.reload();
              // $("#receive_info").html(area_option);
          }
      });
    });

  $("#save-time").click(function(){
    changeDate($("#site_url_hidden").val(),$("#area_hidden").val());
  });

  $("#save_pay").click(function(){
    update_pay($("#site_url_hidden").val());
    change_update_btn();
  });

  $("#order_submit_button").click(function(){
    $('#order_submit_button').attr("disabled","true");
    if($(".user-enter").css("display")!='none'){
	// autoTglog(11);
      jAlert("请先保存收货地址","温馨提示");
      return false;
    }else if($(".user-tienter").css("display")!='none'){
	// autoTglog(11);
      jAlert("请先保存配送时间","温馨提示");
      return false;
    }else if($(".user-payenter").css("display")!='none'){
	// autoTglog(11);
      jAlert("请先保存支付方式","温馨提示");
      return false;
    }
	// autoTglog(12);
    if($("#showinv").css("display")!="none"){
      if($("#fp").val().length>20){
        jAlert("发票抬头请不要大于20个字","温馨提示");
        return false;
      }
    }
    if($("#is_invoice").attr("checked")=='checked'){
      if($("#fp_dz").val()==''){
        jAlert("请填写发票快递地址","温馨提示");
        return false;
      }
    }

    // if($("#dz_fp_mobile").val()!=''){
    //   if(!isMobel($("#dz_fp_mobile").val())){
    //           jAlert("请填写正确的收票人手机","温馨提示");
    //           return false;
    //   } 


    // }
    $("#order_submit").submit();
    return false;
  });

  $('#is_invoice').click(function(){
        $url=getHost();
        $url="http://"+$url+"/index.php";
        if ( $('#is_invoice').attr('checked') ){
            $.post($url+"/order/invOtherAddr",{type:"1"},function(data){
                $(".invoice").show();
                checkout_detail($url);
            });
            $.post("/index.php/order/Addr_copy/",{},function(data){
                var area_option = eval('('+data+')');
                $(".invoice_area_option").html(area_option);
              });
        }
        else{
            $.post($url+"/order/invOtherAddr",{type:"2"},function(data){
                $(".invoice").hide();
                $(".invoice").find("input").val('');
                checkout_detail($url);
            })
        }
    });

    var old_addr = $("#old_addr").html();
    if(old_addr!=null){
    $.post("/order/sendRegionFilter",{id:old_addr},function(data){
        if(data!='ok'){
                var can_not_send_pro_arr = eval('('+data+')');
                if(can_not_send_pro_arr['result']=='error'){
                  jAlert(can_not_send_pro_arr['msg'],'温馨提示');
                  $("#mod-address a").click();
                  var now_id = $(".check_address:checked").val();
                  $("#editaddress_"+now_id+" a").click();
                  return false;
                }
                var boxy_html = '<h4 class="sorry"><img src="/images/alert.png">&nbsp;&nbsp;抱歉，您购买的以下商品无法配送至您的收货地址：</h4>';
                boxy_html += '<h6 style="margin-top:0px;padding-top:0px;text-align:center;">'+can_not_send_pro_arr['user_address']+'</h6>';
                boxy_html += '<h6 style="margin-top:0px;padding-top:0px;text-align:center;">请<a href="'+$("#site_url_hidden").val()+'" style="color:green;">返回首页</a>查看站点是否选择正确</h6>';
                boxy_html += '<table class="not_dis_table"><tbody><tr><th width="370">商品名</th><th width="65">已购数量</th><th width="95">支持配送区域</th></tr>';
                var del_proids = ''
                for(i in can_not_send_pro_arr){
                  if(!isNaN(i)){
                    del_proids += can_not_send_pro_arr[i]['sku_id']+',';
                    boxy_html += '<tr><td><span class="headline"><a target="_blank" href="web/pro/'+can_not_send_pro_arr[i]['product_id']+'">'+can_not_send_pro_arr[i]['name']+'</a></span></td><td>'+can_not_send_pro_arr[i]['qty']+'</td><td>'+can_not_send_pro_arr[i]['can_send_area']+'</td></tr>';
                  }
                }
                boxy_html += '</tbody></table>';
                boxy_html += '<p class="sorry_button_p"><button class="sorry_button" onclick="window.location=\'/showcart\';">修改配送站点</button><button class="sorry_button" onclick="change_user_address();">修改收货地址</button></p>';
                var region_boxy = new Boxy(boxy_html, {title: "温馨提示"});
                region_boxy.resize();
            }else{
              changeDate($("#site_url_hidden").val(),$("#area").val(),true);
            }
        });
    }

    if($(".pay_parent_id:checked").val()=='5'){
      show_verify('5');
    }


    if($("#address_empty_hidden").val()){
      $(".new-address").show();
      $.post("/index.php/order/Addr_copy/",{},function(data){
        var area_option = eval('('+data+')');
        $("#new-address .area_option").html(area_option);
      });
    }
    if($("#paym_hidden").val()){
      $(".user-payment").show();
      $(".user-payenter").hide();
    }

    if($("#old_addr")){
      $("#addr_hidden_id").val($("#old_addr").html());
    }


    $.post("/order/check_wx_active/",{},function(data){
        var result = eval('('+data+')');
            if(result['result']=="error"){
                jAlert(result['msg']);
                checkout_detail();
            }
        });


    //test
    $("body").delegate("#mod-time a", 'click', function() {
     var addr = $("#addr_hidden").val();
     if(!addr) {
         $("#user-enter").show();
         $("#addr_notice").html("请先保存送货地址");
         return;
     }
     $(this).parents().find(".user-time").hide();
     $(this).parents().find(".user-tienter").show();
     $(".user-message").show();
      $(".user-enter").hide();
      $(".user-payment").show();
      $(".user-payenter").hide();
      change_update_btn();
     }) 
   $("#save-time").click(function(){
     $(this).parents().find(".user-time").show();
     $(this).parents().find(".user-tienter").hide();
     // change_update_btn();
     })    

   $("#select_send_time").click(function(){
     $(this).parents().find(".tx-left02-fix").show();
     });
   
   $(".time-color dd").hover(function() {
           $(this).addClass("color-green");
       },function(){
        $(this).removeClass("color-green");
    });

  $(".tx-left02-fix").live("mouseleave",function(){
        $(this).hide();
    });
   $(".time-color dd").click(function(){
      var eventclick = $(this).attr('eventclick');
      if(eventclick=='true'){
        var date = $(this).attr('date');
        var time = $(this).attr('time');
        var datev = $(this).attr('datev');
        var timev = $(this).attr('timev');
        var myDate = new Date();
        var sende_date_v = '2015'+'-'+datev+' '+timev;
        $("#select_send_time p").html(sende_date_v);
        $("#shtime").val(date);
        $("#stime").val(time);
        $(".time-color dd span[class='dateri-now']").attr('class','dateri-yes');
        $("#"+date+"-"+time).attr('class','dateri-now');
        $(".tx-left02-fix").hide();
      }
   });

   $("#"+$("#shtime").val()+"-"+$("#stime").val()).attr('class','dateri-now');

   var order_msg = $("#order_msg_hidden").val();
   var order_hk = $("#order_hk_hidden").val();
   if(order_msg){
     $(".get_msg[value='true']").attr("checked",'checked');
     $(".tx-liuyan").val(order_msg);
   }
   if(order_hk){
     $(".get_hk[value='true']").attr("checked",'checked');
     $(".tx-heka").val(order_hk);
   }

   if($(".get_msg:checked").val()=='true'){
    $("#msg_span").show();
   }
   if($(".get_hk:checked").val()=='true'){
    $("#hk_span").show();
   }

   $(".get_msg").change(function(){
      if($(this).val()=='true'){
        $("#msg_span").show();
      }else{
        $("#msg_span").hide();
      }
   });

   $(".get_hk").change(function(){
      if($(this).val()=='true'){
        $("#hk_span").show();
      }else{
        $("#hk_span").hide();
      }
   });
   /*date rili*/

   /*提示流程start*/
   var area_info = $("#addr_hidden").val();
   var send_time_info = $("#selected_send_time_hidden").val();
   var pay_info = $("#paym_hidden").val();
   if(!area_info){
      $(".user-message").hide();
      $(".user-enter").show();
      $(".user-time").show();
      $(".user-tienter").hide();
      $(".user-payment").show();
      $(".user-payenter").hide();
   }else if(!send_time_info){
      $(".user-message").show();
      $(".user-enter").hide();
      $(".user-time").hide();
      $(".user-tienter").show();
      $(".user-payment").show();
      $(".user-payenter").hide();
   }else if(!pay_info){
      $(".user-message").show();
      $(".user-enter").hide();
      $(".user-time").show();
      $(".user-tienter").hide();
      $(".user-payment").hide();
      $(".user-payenter").show();
   }
   /*提示流程end*/

   /*发票判断start*/
   var has_invoice = $("#has_invoice_hidden").val();
   if(has_invoice==0){
     $url=getHost();
     $url="http://"+$url;
     $("#need_invocie").hide();
     $.post($url+"/order/invOtherAddr",{type:"4"},function(data){
        $(".invoice").hide();
        $(".invoice").find("input").val('');
        checkout_detail($url);
     });
   }
   /*发票判断end*/

   /*余额抵扣判断start*/
   var has_money_deduction = $("#money_deduction_hidden").val();
   if(has_money_deduction>0){
    use_money_deduction($("#site_url_hidden").val());
   }
   
   /*余的抵扣判断end*/
   
   /*失去焦点触发验证start*/
   $("#mverify").blur(function(){
      check_code($("#site_url_hidden").val(),'','');
   }); 
   $("#code").blur(function(){
      check_code($("#site_url_hidden").val(),'deduction','');
   }); 
   /*失去焦点触发验证end*/

   /*ok卡选择提示start*/
   $(".pay_parent_id").click(function(){
    var check_id = $(this).val();
    if(check_id=='2'){
      jAlert("请确认您使用的ok卡类型，新版红色ok卡暂不支持","温馨提示");
    }
   });
   /*ok卡选择提示end*/

   /*展开编辑框优化start*/
   change_update_btn();
   /*展开编辑框优化end*/
});