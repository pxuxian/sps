<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="common.jsp"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control"
	content="no-cache,no-store, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>今日特供-订单结算</title>

<script type="text/javascript">
	$(function() {
		$("#cart_submit").click(function() {
			$("#cart_submit_form").submit();
		});
	});
</script>

</head>

<body>
	<jsp:include page="top.jsp" />

	<div style="font-family:微软雅黑;">
		<div class="cen cart_gray_box mt20">
			<table class="cart_list_tb">
				<colgroup>
					<col width="60"></col>
					<col width="370"></col>
					<col width="110"></col>
					<col width="110"></col>
					<col width="110"></col>
					<col width="110"></col>
					<col width="120"></col>
				</colgroup>
				<thead>
					<tr>
						<th></th>
						<th><span class="pr25">商品名称</span></th>
						<th></th>
						<th>单价</th>
						<th>数量</th>
						<th>小计(元)</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${cart.cartItemList }" var="cartItem"
						varStatus="i">
						<tr>
							<td colspan="7">
								<div id="shopping_cart0" class="shopping_cart_tr ">
									<div class="shpcrt_blank10 clearfix"></div>
									<dl class="clearfix">
										<dd class="fl rel col_chkbox"></dd>
										<dt class="col_1 fl rel">
											<a target="_blank"
												href="/detail.action?id=${cartItem.product.id }"> <img
												src="/upload/img/product/logo/${cartItem.product.logo }"
												width="60" height="60" class="thumImg" />
											</a>
										</dt>
										<dd class="col_2 fl rel">
											<div>
												<a target="_blank"
													href="/detail.action?id=${cartItem.product.id }"
													title="${cartItem.product.name }" class="shopLink">${cartItem.product.name }</a>
											</div>

										</dd>
										<dd class="col_3 fl"></dd>
										<dd class="col_4 fl rel ">${cartItem.product.price }</dd>
										<dd class="col_5 fl rel">
											<a class="goodsSub fl" style="height:22px;"
												href="javascript:modifyCartNumDec(${cartItem.product.id });">-</a>
											<input id="buy_num" class="goodsTxt fl" type="text"
												value="${cartItem.count }" name="goodsCount" style="height:22px;" /> <a
												class="goodsPlus fl" style="height:22px;"
												href="javascript:modifyCartNumAdd(${cartItem.product.id });">+</a>
										</dd>
										<dd class="col_6 fl">
											<strong class="corg">${cartItem.subtotal }</strong>
										</dd>
										<dd class="col_7 fl">
											<a
												href="/modifyCart.action?id=${cartItem.product.id }&op=delete"
												class="JsRemoveGood JsDel">删除</a>
										</dd>
									</dl>
								</div>
							</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>

		<div class="cen cart_gray_box_ft" align="right">
			<strong>总计（不含运费）</strong>：<strong class="cgray f16">¥</strong><strong
				class="corg f20">${cart.total }</strong> <a href="/toOrder.action"
				class="cart_b_paybtn ml10 " id="cart_submit">去结算</a>
		</div>
	</div>

	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<jsp:include page="footer.jsp" />
</body>
</html>