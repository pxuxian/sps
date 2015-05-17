<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="common.jsp"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>今日特供-订单结算</title>

<script type="text/javascript">
	$('document').ready(function() {
		$('#sub').click(function() {
			var needReg = $('#needReg').val();
			if (needReg == '1') {
				var userNameFlag = true;
				var username = $('#uname').val();
				if (username.length<=0) {
					alert("请输入注册用户名，谢谢!");
					return false;
				}
				$.ajaxSetup({
					async : false
				});
				var data = {
					'user.username' : username
				};
				$.post("ajax_reg.action", data, function(msg) {
					if (msg != '0') {
						alert("用户名已存在，请您更换一个，谢谢!");
						userNameFlag = false;
					} else {
						userNameFlag = true;
					}
				});
				if (userNameFlag == false) {
					return false;
				}
				var pass = $('#password').val();
				var pass2 = $('#password2').val();
				if (pass.length<=0) {
					alert("请输入密码，谢谢!");
					return false;
				} else if (pass != pass2) {
					alert("您两次输入的密码不一致，谢谢!");
					return false;
				}
			}
			var receiver = $('#receiver').val();
			var address = $('#address').val();
			var mobile = $('#mobile').val();
			if (receiver.length <= 0) {
				alert("请输入收货人，谢谢！");
				return false;
			}
			if (address.length <= 0) {
				alert("请输入收货详细地址，谢谢！");
				return false;
			}
			if (mobile.length <= 0) {
				alert("请输入手机号码，谢谢！");
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
								<div class="field-tit">你还没有登录 ，顺便注册一下 ): </div>&nbsp;&nbsp;&nbsp;
								已经注册过，<a href="login.jsp"><font color="#FF8800">去登录</font></a>
								<input type="hidden" id="needReg" value="1" />
							</div>
							<div class="orderAddressForm">
								<div class="orderList">
									<span class="title"><em>*</em>用户名：</span>
									<div class="field">
										<input id="uname" name="order.user.username" type="text"
											class="form-2" style="border-color: #FEA9A9" />
									</div>
								</div>
								<br />
								<div class="orderList">
									<span class="title"><em>*</em>密码：</span>
									<div class="field">
										<input id="password" name="order.user.password"
											type="password" class="form-2" />
									</div>
								</div>
								<br />
								<div class="orderList">
									<span class="title"><em>*</em>确认密码：</span>
									<div class="field">
										<input id="password2" type="password" class="form-2" />
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
									<input id="receiver" name="order.receiver" type="text"
										class="form-2" style="border-color: #FEA9A9" />
								</div>
							</div>
							<div class="orderList">
								<span class="title"><em>*</em>详细地址：</span>
								<div class="field">
									<input id="address" name="order.address" type="text"
										class="form-2" />
								</div>
							</div>
							<div class="orderList">
								<span class="title"><em>*</em>手机：</span>
								<div class="field">
									<input id="mobile" name="order.mobile" type="text"
										class="form-2" />&nbsp;&nbsp;或固定电话： <input
										name="order.telphone" type="text" class="form-2" id="new_tele" />&nbsp;&nbsp;格式：区号-电话
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
							<a href="javascript:void(0);" class="cart_b_paybtn ml10 " id="sub">提交订单</a>
						</span>
					</div>
				</div>
			</div>
		</form>
	</div>
	<jsp:include page="footer.jsp" />
</body>
</html>