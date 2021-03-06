<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="common.jsp"%>
<html>
<head>
<meta name="keywords" content="今日特供,特产,农村特产,土特产,土特产专卖,绿色食品" />
<meta name="description" content="今日特供,特产,农村特产,土特产,土特产专卖,绿色食品" />
<title>今日特供-莫笑农家腊酒浑，丰年留客足鸡豚！</title>
<script type="text/javascript">
	$('document').ready(function() {
		$("#cart_box").click(function() {
			window.location.href = "/showCart.action";
		});
		
		$("#search_button").click(function() {
			var wd = $('#search_keyword').val();
			window.location.href = "/search.action?wd=" + wd;
		});
		
		listTopNews();
	});
	
	function listTopNews() {
		var url = "listTopNews.action";
		var data = {};
		$.post(url, data, function(msg) {
			if(msg != null && msg != '') {
				$("#topNews").html(msg);
			}
		});
	}
	
</script>
</head>
<body>
	<div align="right" style="width:90%;margin-top:3px;">
		<c:choose>
			<c:when test="${!empty sessionScope.sessionUser.nickName }">
				欢迎您 ${sessionScope.sessionUser.nickName }
			</c:when>
			<c:otherwise>
				欢迎您 ${sessionScope.sessionUser.username }
			</c:otherwise>
		</c:choose>
		
		<c:if test="${!empty sessionScope.sessionUser and sessionScope.sessionUser.role.id==100 }">
			| <a href="/admin.action">管理后台</a>
		</c:if>
		<c:choose>
			<c:when test="${empty sessionScope.sessionUser }">
				 | <a href="reg.jsp">注册</a>
				 | <a href="login.jsp">登录</a>
			</c:when>
			<c:otherwise>
				 | <a href="myOrder.action">我的订单</a>
				 | <a href="logout.action">退出</a>
			</c:otherwise>
		</c:choose>
	</div>
	<div class="top-box">
		<div class="top-box01">
			<div class="container-top">
				<div class="logo-green">
					<!-- to delete -->
					<br>
					<h1>
						<a href="/"><img src="./images/logo/logo.jpg" alt="今日特供-绿色网购" width="250px" height="80px" /></a>
					</h1>
				</div>
				<div class="logo-adress">
					<div class="logo-adress-one"></div>
				</div>
				<div class="search-wrap statis_search">
					<span id="topNews"></span>
					<form action="search.action" method="post" id="searchForm">
						<div class="search-panel">
							<div class="input-wrap" align="center">
								<i class="sech"></i> <input id="search_keyword" type="text"
									value="${wd }" name="wd" class="logo-search-input" />
							</div>
							<div class="search-button">
								<button class="btn-search" id="search_button" type="button"></button>
							</div>
						</div>
					</form>
					<div class="search-ft">
						<ul>
							<li>热点搜索：</li>
							<li><a href="search.action?wd=土鸡">土鸡</a></li>
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
		<br>
		<div class="top-box02">
			<div class="container">
				<div class="nav">
					<div class="nav-all">
						<div class="nav-all-title">
							<a href="/">全部商品</a> <i></i>
						</div>
						<div class="nav-all-class statis_class">
							<div>
								<ul>
									<c:forEach items="${pcList }" var="pc">
										<li><a href="/?cid=${pc.id }">${pc.name }</a></li>
									</c:forEach>
								</ul>
							</div>
						</div>
					</div>
					<div class="nav-other" style="font-weight: 600;">
						<ul>
							<li><a href="/">首页</a></li>
							<c:forEach items="${pcList }" var="pc">
								<li><a href="/?cid=${pc.id }">${pc.name }</a></li>
							</c:forEach>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>