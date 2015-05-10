<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="common.jsp"%>

<html>
<head>
<meta name="keywords" content="天天果园官网,鲜果网购,智利樱桃,车厘子" />
<meta name="description" content="天天果园官方网站提供水果生鲜" />
<title>今日特供-绿色网购</title>
<style type="text/css">
/* img {
	border-radius: 8px;
	-webkit-border-radius: 8px;
	-moz-border-radius: 8px;
} */
</style>
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

	<div class="list-cp">
		<div class="list-cp-box">
			<div class="list-cp-left">
				<div class="list-left-menu statis_class">
					<ul>
						<c:forEach items="${pcList }" var="pc">
							<li><a href="search.action?wd=${pc.name }">${pc.name }</a></li>
						</c:forEach>
					</ul>
				</div>
			</div>

			<div class="list-cp-right">
				<div class="list-right-title">
					<h3>
						<a href="/">首页</a> &gt; 搜索
					</h3>
				</div>
				<!-- <div class="list-right-nav">
					<ul>
						<li>品类： <a class="now-ss"
							href="/web/search/%E5%A5%87%E5%BC%82%E6%9E%9C/0/0-0-0-0-0-0-0">不限</a>
							<a
							href="/web/search/%E5%A5%87%E5%BC%82%E6%9E%9C/0/0-0-0-0-0-0-1">绿奇异果</a>
							<a
							href="/web/search/%E5%A5%87%E5%BC%82%E6%9E%9C/0/0-0-0-0-0-0-54">阳光金果</a>
						</li>
						<li style="border-bottom: none;">价格： <a class="now-ss"
							href="/web/search/%E5%A5%87%E5%BC%82%E6%9E%9C/0/0-0-0-0-0-0-0">不限</a>
							<a
							href="/web/search/%E5%A5%87%E5%BC%82%E6%9E%9C/0/0-0-0-0-0T100-0-0">100以下</a>
							<a
							href="/web/search/%E5%A5%87%E5%BC%82%E6%9E%9C/0/0-0-0-0-100T300-0-0">100~300</a>
							<a
							href="/web/search/%E5%A5%87%E5%BC%82%E6%9E%9C/0/0-0-0-0-300T-0-0">300以上</a>
						</li>
					</ul>
				</div> -->

				<!--cp start-->
				<div class="list-right-one">
					<div class="neilist-cp01">
						<div class="neilist-cp01-title">
							<h3>&nbsp;</h3>
						</div>
						<div class="neilist-cp01-box">
							<c:forEach items="${productList }" var="p">
								<input type="hidden" name="cartItem.productId" value="${p.id }" />
								<div class="neilist-pictu">
									<ul>
										<li class="cplist-p01"><a
											href="detail.action?id=${p.id }" target="_blank"> <img
												src="/upload/img/product/logo/${p.logo }" />
										</a></li>
										<li class="cplist-p02"><a
											href="detail.action?id=${p.id }" target="_blank">${p.name }</a></li>
										<li class="cplist-p04"><span class="green01"
											id="pro_price_4058">￥${p.price }</span>
											<div class="cplist-p05-btn02">
												<a href="addCart.action?cartItem.productId=${p.id }"
													target="_blank" class="btn-buynow-other"></a>
											</div>
										</li>
									</ul>
								</div>
							</c:forEach>
						</div>
					</div>
				</div>
				<!--cp end-->
			</div>
		</div>
	</div>

	<jsp:include page="footer.jsp" />
</body>
</html>