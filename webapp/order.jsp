<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="common.jsp"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>订单结算</title>

<script type="text/javascript">
$('document').ready(function() {
	var userNameFlag = true;
	$('#uname').blur(function(){
		var username = $('#uname').val();
		$('#uname').focus(function(){$(this).next().text("");});
        if (username.length<4 || username.length>12){
			$(this).next().text("用户名长度不符合，长度应大于4个字符或小于12个字符");
			userNameFlag = false;
            return false;
		}
		var url = "ajax_reg.action";
		var data = {'user.username':username};
		$.post(url, data, function(msg) {
			if(msg != '0'){
				$('#username').next().text("sorry, 已经有这个名字了，请您更换一个!");
				userNameFlag = false;
				return;
			} else {
				userNameFlag = true;
			}
		});
	});
	
	$('#sub').click(function() {
		if (userNameFlag == false) {
			$('#username').next().text("sorry, 已经有这个名字了，请您更换一个!");
			return false;
		}
        var flogs = true;
        var pass = $('#password').val();
        var pass2 = $('#password2').val();
        $('#password').focus(function(){$(this).next().text("");});
        $('#password2').focus(function(){$(this).next().text("");});
		if(pass.length<6 || pass.length>18){
			$('#password').next().text("为了您的账户安全，密码至少得设置6个字符");
			flogs = false;
		}else if(pass != pass2){
			$('#password2').next().text("sorry, 您两次输入的密码不一致");
			flogs = false;
        }
        if(flogs == false){
            return false;
        }
        $("#orderForm").submit();
	});
});
</script>

</head>
<body>
	<jsp:include page="top.jsp" />

	<div class="cartWrap">
		<form action="/submitOrder.action" method="post" id="orderForm">
			<div class="cartMain">
				<div class="orderInfo">
					<c:if test="${empty sessionScope.sessionUser }">
						<div class="step-1">
							<div class="stepTitle">
								<div class="field-tit">顺便注册一下</div>
							</div>
							<div class="orderAddressForm">
								<div class="orderList">
									<span class="title"><em>*</em>用户名：</span>
									<div class="field">
										<input id="uname" name="order.user.username" type="text"
											class="form-2" style="border-color: #FEA9A9" />
										<p style="color: red; height: 10px; font-size: 10px; position: relative; top: -5px;"></p>
									</div>
								</div>
								<br />
								<div class="orderList">
									<span class="title"><em>*</em>密码：</span>
									<div class="field">
										<input id="password" name="order.user.password" type="password"
											class="form-2" />
										<p style="color: red; height: 10px; font-size: 10px; position: relative; top: -5px;"></p>
									</div>
								</div>
								<br />
								<div class="orderList">
									<span class="title"><em>*</em>确认密码：</span>
									<div class="field">
										<input id="password2" type="password" class="form-2" />
										<p style="color: red; height: 10px; font-size: 10px; position: relative; top: -5px;"></p>
									</div>
								</div>
							</div>
						</div>
					</c:if>
					<div class="step-1">
						<div class="stepTitle">
							<div class="field-tit">收货人信息</div>
						</div>
						<div class="orderAddressForm">
							<div class="orderList">
								<span class="title"><em>*</em>收货人：</span>
								<div class="field">
									<input name="order.receiver" type="text" class="form-2"
										value="" maxlength="25" style="border-color: #FEA9A9" />
								</div>
							</div>
							<div class="orderList">
								<span class="title"><em>*</em>详细地址：</span>
								<div class="field">
									<input name="order.address" type="text" class="form-2"
										id="new_detail" value="" maxlength="50" />
								</div>
							</div>
							<div class="orderList">
								<span class="title"><em>*</em>手机：</span>
								<div class="field">
									<input name="order.mobile" type="text" class="form-2" value=""
										id="new_phone" />&nbsp;&nbsp;或固定电话： <input
										name="order.telphone" type="text" class="form-2" id="new_tele"
										value="" />&nbsp;&nbsp;格式：区号-电话
								</div>
							</div>
						</div>
					</div>
					<div class="step-7">
						<div class="stepTitle">商品信息</div>
						<a href="/showCart.action" class="backCart">返回修改购物车</a>
						<div class="productInfoWrap">
							<div class="productInfoTitle">
								<div class="InfoTitle-1"></div>
								<div class="InfoTitle-2">商品名称</div>
								<div class="InfoTitle-3">价格</div>
								<div class="InfoTitle-4">购买数量</div>
								<div class="InfoTitle-5">小计</div>
							</div>
							<div class="productListW">
								<div class="productList">
									<div class="productTable">
										<table cellpadding="0" cellspacing="0">
											<tbody>
												<c:forEach items="${order.orderProducts }"
													var="orderProduct">
													<tr>
														<td width="542">
															<div class="productImg">
																<a href="/detail.action?id=${orderProduct.product.id }"
																	target="_blank"> <img
																	src="/upload/img/product/logo/${orderProduct.product.logo }"
																	alt="${orderProduct.product.name }" width="52"
																	height="52" /></a>
															</div>
															<div class="productName">
																<p class="twoName">
																	<a title="${orderProduct.product.name }"
																		target="_blank"
																		href="/detail.action?id=${orderProduct.product.id }">${orderProduct.product.name }</a>
																</p>
															</div>
														</td>
														<td width="165" rowspan="1">
															<div class="productPriM">￥${orderProduct.price }</div>
														</td>
														<td width="130" rowspan="1">
															<div class="productNum">
																<span>${orderProduct.count }</span>
															</div>
														</td>
														<td width="150" rowspan="1" class="bb">
															<div class="productPri">￥${orderProduct.subtotal }</div>
														</td>
													</tr>
												</c:forEach>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="step-8">
						<div class="stepTitle">订单结算</div>
						<div align="right">
							<input type="hidden" name="order.amount" value="${order.amount }" />
							<input type="hidden" name="order.postage"
								value="${order.postage }" /> <input type="hidden"
								name="order.discount" value="${order.discount }" /> <input
								type="hidden" name="order.total" value="${order.total }" />
							<p>
								<span style='font-size: 15px; font-family: "微软雅黑";'>商品金额：￥<font
									color="red">${order.amount } </font></span> &nbsp;
							</p>
							<p>
								<span style='font-size: 15px; font-family: "微软雅黑";'>运费：￥<font
									color="red">${order.postage } </font></span> &nbsp;
							</p>
							<p>
								<span style='font-size: 15px; font-family: "微软雅黑";'>优惠：-￥<font
									color="red">${order.discount } </font></span> &nbsp;
							</p>
						</div>
					</div>
				</div>
				<div class="orderInfo">
					<div class="step-9" align="right">
						<span style='font-size: 20px; font-family: "微软雅黑";'>应付总金额：￥<font
							color="red">${order.total }</font>
							<button class="btn-submit-order" id="sub" type="submit">
								<span style='font-size: 20px; font-family: "微软雅黑";'>提交订单</span>
							</button>
						</span>
					</div>
				</div>
			</div>
		</form>
	</div>
	<jsp:include page="footer.jsp" />
</body>
</html>