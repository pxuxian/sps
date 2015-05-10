<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="common.jsp"%>
<html>
<head>
<script type="text/javascript">
	$(function() {
		$("#cart_box").click(function() {
			window.location.href = "/showCart.action";
		});
	});
</script>
</head>
<body>
	<div class="top-box">
		<div align="right" style="width:90%">
			<c:if test="${!empty sessionScope.sessionUser }">
				<a href="myOrder.action">我的订单</a>
				<a href="logout.action">退出</a>
			</c:if>
			<c:if test="${empty sessionScope.sessionUser }">
				<a href="login.jsp">登录</a>
			</c:if>
		</div>
		<div class="top-box01">
			<div class="container-top">
				<div class="logo-green">
					<h1>
						<a href="/"><img src="./images/fdaylogo.png" alt="今日特供-绿色网购" /></a>
					</h1>
				</div>
				<div class="logo-adress">
					<div class="logo-adress-one"></div>
				</div>
				<div class="search-wrap statis_search">
					<div class="search-panel">
						<div class="input-wrap" align="center">
							<i class="sech"></i> <input id="search_keyword" type="text"
								value="${wd }" class="logo-search-input" />
						</div>
						<div class="search-button">
							<button class="btn-search" id="search_button" type="button"></button>
						</div>
					</div>
					<div class="search-ft">
						<ul>
							<li>热点搜索：</li>
							<li><a href="search.action?wd=苹果">苹果</a></li>
						</ul>
					</div>
				</div>

				<div class="nav-mes">
					<div class="nav-mes-cart">
						<div class="menu-hd" id="cart_box">
							<div class="menu-hd1" id="cart_number">
								<c:if test="${empty sessionScope.sessionCart }">0</c:if>
								<c:if test="${!empty sessionScope.sessionCart }">${sessionScope.sessionCart.count }</c:if>
							</div>
						</div>
						<div class="nav-mes-minicart" style="display: none;">
							<div id="cart_list" style="display: inline-block;">
								<div class="mini-cart-cp">
									<c:forEach items="${sessionScope.sessionCart.cartItemList }"
										var="cartItem">
										<div class="mini-cart-cpbox">
											<div class="mini-cart-cpleft">
												<a href="/detail.action?id=${cartItem.product.id }"><img
													src="/upload/img/product/logo/${cartItem.product.logo }"></a>
											</div>
											<div class="mini-cart-cpright">
												<div class="cpright01">
													<p class="mini-guige">
														<a href="/detail.action?id=${cartItem.product.id }">${cartItem.product.name }</a>
													</p>
												</div>
												<div class="cpright02">
													<p>
														<span>${cartItem.count }</span>
													</p>
												</div>
												<div class="cpright03">
													<p>￥${cartItem.subtotal }</p>
												</div>
											</div>
										</div>
									</c:forEach>
								</div>
								<div class="mini-car-btn">
									商品小计 <span id="total_price"
										style="font-size: 16px; color: #DD1517;">￥${sessionScope.sessionCart.total }</span>
									<p>
										<a href="/showCart.action"><img
											src="/images/cart_order.jpg"></a>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="top-box02">
			<div class="container">
				<div class="nav">
					<div class="nav-all">
						<div class="nav-all-title">
							<a href="">全部商品</a> <i></i>
						</div>
						<div class="nav-all-class statis_class">
							<div>
								<ul>
									<c:forEach items="${pcList }" var="pc">
										<li><a href="">${pc.name }</a></li>
									</c:forEach>
								</ul>
							</div>
						</div>
					</div>
					<div class="nav-other" style="font-weight: 600;">
						<ul>
							<li><a href="./">首页</a></li>
							<c:forEach items="${pcList }" var="pc">
								<li><a href="">${pc.name }</a></li>
							</c:forEach>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
</html>