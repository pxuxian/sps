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
img {
	border-radius: 8px;
	-webkit-border-radius: 8px;
	-moz-border-radius: 8px;
}
</style>
</head>

<body>
	<jsp:include page="top.jsp" />

	<div class="box_body">
		<!--广告位开始-->
		<%-- <div class="container">
			<div class="show-banner statis_index_rotation">
				<div class="showpic-x">
					<ul class="showpic-num"
						style="position: relative; width: 1101px; height: 401px;">
						<c:forEach begin="1" end="3">
							<li
								style="position: absolute; width: 1101px; left: 0px; top: 0px; display: none;"><a
								href="detail.jsp" target="_blank"><img
									src="./images/showpic_1.jpg" /></a></li>
						</c:forEach>
					</ul>
					<a class="prev" href="javascript:void(0)"
						style="opacity: 0.1; display: none;"></a> <a class="next"
						href="javascript:void(0)" style="opacity: 0.1; display: none;"></a>
					<div class="num">
						<ul>
							<li class="on">1</li>
							<li class="">2</li>
							<li class="">3</li>
						</ul>
					</div>
				</div>
				<script src="./styles/showpic.js" type="text/javascript"></script>
			</div>
		</div> --%>
		<!--广告位结束-->

		<!--中间产品内容开始-->
		<div class="box_bg2">
			<div class="container">
				<div class="onelist">
					<div class="onelist-left">
						<div class="onelist-cp01">
							<div class="onelist-cp01-title">
								<h3>今日特供</h3>
								<h4>
									<a href="">查看更多 &gt;</a>
								</h4>
							</div>
							<div class="onelist-cp01-box">
								<c:forEach items="${productList1 }" var="p" varStatus="status">
									<div class="onelist-pictu statis_index_listproduct"
										<c:if test="${status.count > 1 && status.count % 4 == 0 }"> style="padding-right: 0px;"</c:if>>
										<ul>
											<li class="cplist-p01" style="position: relative;"><a
												href="detail.action?id=${p.id }" target="_blank"> <img
													src="/upload/img/product/logo/${p.logo }" />
											</a>
												<!-- <div class="icon-red"></div> --></li>
											<li class="cplist-p02"><a href="detail.jsp"
												target="_blank">${p.name } </a></li>
											<!-- <li class="cplist-p03" style="float: none;">12个装</li> -->
											<li class="cplist-p04"><span class="green01"
												style="float: left;">抢购价: ￥${p.price }</span></li>
										</ul>
									</div>
								</c:forEach>
							</div>
						</div>
						<div class="onelist-cp01">
							<div class="onelist-cp01-title">
								<h3>优惠专区</h3>
								<h4>
									<a href="">查看更多 &gt;</a>
								</h4>
							</div>
							<div class="onelist-cp01-box">
								<c:forEach items="${productList2 }" var="p" varStatus="status">
									<div class="onelist-pictu statis_index_listproduct"
										<c:if test="${status.count > 1 && status.count % 4 == 0 }"> style="padding-right: 0px;"</c:if>>
										<ul>
											<li class="cplist-p01" style="position: relative;"><a
												href="detail.action?id=${p.id }" target="_blank"> <img
													src="/upload/img/product/logo/${p.logo }" />
											</a>
												<!-- <div class="icon-green"></div> --></li>
											<li class="cplist-p02"><a href="detail.jsp"
												target="_blank">${p.name } </a></li>
											<!-- <li class="cplist-p03" style="float: none;">4斤装</li> -->
											<li class="cplist-p04"><span class="green01"
												style="float: left;">抢购价: ￥${p.price }</span></li>
										</ul>
									</div>
								</c:forEach>
							</div>
						</div>
					</div>

					<div class="onelist-right">
						<!-- <div class="onelist-right-gg01 statis_index_rightactive">
							<ul>
								<li><a href="" target="_blank"><img
										title="全场满300赠加拿大北极甜虾" src="./images/1427940255_pic.jpg" /></a></li>
								<li><a href="javascript:void(0);" style="cursor: default"><img
										title="APP" src="./images/1427794630_pic.jpg" /></a></li>
							</ul>
						</div> -->

						<div class="onelist-right-gg02">
							<div class="title_1 statis_index_hotproduct">
								<h4>热销人气商品</h4>
								<span><a href="">MORE+</a></span>
							</div>
							<div class="onelist-right-box  statis_index_hotproduct">
								<div class="onelist-right-three ">
									<dl>
										<dt>
											<a href="/" target="_blank"><img
												src="/images/hot_1.jpg" width="80" height="78" /></a>
										</dt>
										<dd>
											<a href="" target="_blank">泰国龙眼</a>
										</dd>
										<dd class="font_1">现价：￥68</dd>
										<dd class="old-price">原价：￥88</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--中间产品内容结束-->

		<jsp:include page="footer.jsp" />
	</div>
</body>
</html>