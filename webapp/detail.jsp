<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="common.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>今日特供-${p.name }</title>
<script type="text/javascript">
	$(function(){ 
		$("#buy_now").click(function(){ 
			$("#cartForm").submit();
		}); 
	}); 
</script>
</head>
<body>
	<jsp:include page="top.jsp" />

	<div class="detail-box">
		<div class="detail-box-middle" style="margin-top: 8px;">
			<div class="w" style="margin: 0px;">
				<div class="breadcrumb">
					<strong><a href="/">首页</a></strong><span>&nbsp;&gt;&nbsp; <a
						href="/">${p.category.name }</a>&nbsp;&gt;&nbsp;
					</span> <span>${p.name }</span>
				</div>
			</div>
			<div class="detail-box-left">
				<div class="detail-box-left-one">
					<div class="detail-one-left">
						<div class="detail-bigpic">
							<div>
								<img src="/upload/img/product/logo/${p.logo }" id="defaultImg" style="border:1px solid #00DD00;" />
							</div>
						</div>
						<div class="detail-samllpic">
							<ul>
								<li><img
									onmouseover="javascript:showDaTu(&#39;http://127.0.0.1/upload/img/product/logo/${p.logo }&#39;)"
									src="/upload/img/product/logo/${p.logo }" style="border:1px solid #00DD00;"/></li>
							</ul>
						</div>
					</div>
					<div class="detail-one-right">
						<div class="detail-xxone">
							<div class="detail-xx01">
								<h1 class="cp-ming01">${p.name }</h1>
								<p>&nbsp;</p>
								<div class="more-cp">
									<label for="price_5191"> <span class="green01">￥<span
											id="pro_price_5191" class="prod_price">${p.price }</span></span> <span>商品编号:
											${p.code }</span>
									</label>
								</div>
							</div>
						</div>

						<div class="detail-xxtwo-t">
							<div class="contbox">
								<div id="summary-stock">产地：${p.place }</div>
							</div>
						</div>

						<form action="/addCart.action" method="post" id="cartForm" target="_blank">
							<input type="hidden" name="cartItem.productId" value="${p.id }" />
							<div class="detail-xxthree">
								<div class="detail-buy01">
									<span><img onclick="decNum()" src="/images/bag_dec.gif"></span>
									<span><input type="text" id="buy_num" name="cartItem.count"
										value="1" class="number-add"></span> <span><img
										onclick="addNum()" src="/images/bag_add.gif"></span>
								</div>
								<div class="detail-buy02">
									<a href="javascript:void();" id="buy_now" class="buy-now"></a>
								</div>
								<div class="detail-xxfour">
									<h6>商品简介</h6>
									<p>
										<span style="font-size: 13px">${p.descrip }</span> <br>
									</p>
								</div>
							</div>
						</form>
					</div>

					<div class="detail-box-left-js">
						<div class="detail-js-title">
							<a href="javascript:void(0);" class="now-js" id="sp-xq">商品详情</a>
						</div>
						<div class="detail-js-pl" id="pro_detail">
							<p class="detail-pl01">
								<!-- <span>产地：美国</span> <span>净重：单个重量约220克-250克</span> -->
							</p>
							<p></p>
							<p></p>
							<p class="p0" style="margin-top: 0pt; margin-bottom: 0pt">
								${p.detail }</p>
							<p class="p0" style="margin-top: 0pt; margin-bottom: 0pt">&nbsp;</p>
							<p></p>
						</div>
					</div>
				</div>
			</div>

			<div class="detail-box-right">
				<!--viewed start-->
				<!-- <div class="detail-right-history01" id="detail_recent_product"
					style="display: none;">
					<div class="title_Browse">
						<p>最近浏览过的商品</p>
					</div>
					<div class="title_Browse_box"></div>
				</div> -->
				<!--viewed end-->
				<div class="detail-right-history01">
					<div class="title_Browse">
						<p>热销人气商品</p>
						<span> <a href="/">MORE+</a>
						</span>
					</div>
					<div class="title_Browse_box">
						<div class="Browse_box1 ">
							<dl>
								<dt>
									<a target="_blank" href="detail.action?id=${p.id }"><img
										src="/upload/img/product/logo/${p.logo }" width="80"
										height="78"></a>
								</dt>
								<dd>
									<a target="_blank" href="detail.action?id=${p.id }">${p.name }</a>
								</dd>
								<dd class="font_2">现价：￥${p.price }</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--详情部分结束-->

	<!--mini cart-->
	<div class="cartmini-box" style="display: none">
		<div class="cartmini-fix">
			<p class="green01">已成功加入购物车</p>
			<p class="green03">
				购物车共有 <span class="red" id="overlay_cartnum">0</span>件商品，合计：<span
					class="red" id="overlay_cartmoney">￥0</span>
			</p>
			<div>
				<ul>
					<li><a href="javascript:void(0);"
						style="text-decoration: none;" class="btn-cart02" id="close-other">继续逛逛</a></li>
					<li><a href="http://www.fruitday.com/showcart"
						style="text-decoration: none;" class="btn-cart01">去结算</a></li>
				</ul>
			</div>
			<div class="close-other"></div>

		</div>
	</div>

	<jsp:include page="footer.jsp" />
</body>
</html>