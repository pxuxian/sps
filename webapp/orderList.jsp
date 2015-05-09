<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="common.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="./orderList_files/base-order.css" type="text/css"
	rel="stylesheet"></link>
<link href="./orderList_files/header.css" rel="stylesheet"
	type="text/css"></link>
<link href="./orderList_files/menu.css" type="text/css" rel="stylesheet"></link>
<link href="./orderList_files/user.css" rel="stylesheet" type="text/css"></link>
<link href="./orderList_files/user_nav.css" rel="stylesheet"
	type="text/css"></link>
<link href="./orderList_files/user_1200.css" id="newLink"
	rel="stylesheet" type="text/css"></link>
<title>今日特供-我的订单</title>
</head>

<body>
	<jsp:include page="top.jsp" />

	<div class="user clearfix">
		<div class="uBread">
			<a href="/"><b>我的特供</b></a><i>&gt;</i><a href="javascript:;">交易管理</a><i>&gt;</i><em>我的订单</em>
		</div>
		<!-- 左侧导航begin -->
		<div class="sideNav">
			<h1>
				<a href="http://member.jiuxian.com/index.htm"><i></i><span>我的特供</span></a>
			</h1>
			<div class="navList">
				<div class="func func1 clearfix">
					<p class="title">
						<i></i><span>交易管理</span>
					</p>
					<a class="item on" href="/myOrder.action"><span>我的订单</span><i></i></a>
				</div>
			</div>
		</div>
		<!-- 右侧 -->
		<div class="rightBox">
			<div class="rightTit">
				<h2>
					<i></i>我的订单
				</h2>
				<form id="orderForm" name="orderForm" action=""
					onkeydown="if(event.keyCode==13) return false;">
					<div class="myodSearch">
						<!-- <div class="os-search">
							<input type="text" id="orderKey" name="orderKey" value="" /><em>
								订单编号、商品名称、商品编号 </em><a style="cursor: pointer"
								onclick="queryOrderForm();"><i></i>查询</a>
						</div> -->
					</div>
				</form>
			</div>
			<div class="rightCon">
				<div class="myordCon">
					<ul class="moConHead" style="width: 982px;">
						<li class="moh1">商品信息</li>
						<li class="moh2">收货人</li>
						<li class="moh3">实付金额</li>
						<li class="moh4">状态</li>
						<li class="moh5">操作</li>
					</ul>
					<!-- <div class="moConBoxEmpty">
						<div class="moConBoxEmptyFrame">
							<i></i><span>暂无订单</span>
						</div>
					</div> -->
					<div class="moConBox">
						<div class="moCon-ord">
							<div class="ord-num">
								<!-- <span>订单编号：<a href="/" target="_blank">17150509082922815571</a></span><i>|</i><span
									class="ord-tim">下单时间：<em>2015-05-09 20:29:23</em></span> -->
							</div>
							<table class="ord-detailTab" cellpadding="0" cellspacing="0"
								border="0">
								<tbody>
									<c:forEach items="${orderList }" var="order">
										<tr>
											<td class="tdmoh1">
												<div class="ordPicBox clearfix">
													<a class="proId"
														href="detail.action?id=$"
														target="_blank"> <img
														src="./orderList_files/62e75787c134447891e78555f1bbab371.jpg"
														width="50" height="50" title="法国巴朗德公爵干红葡萄酒750ml" /></a>
												</div>
											</td>
											<td class="tdmoh2">aaa</td>
											<td class="tdmoh3">
												<p class="ord-price">¥${order.total }</p>
											</td>
											<td class="tdmoh4">
												<div class="opePending">
													<span>${order.statusStr }</span>
												</div>
											</td>
											<td class="tdmoh5">
												<!-- <p>
													<a class="ope01" target="_blank"
														href="http://member.jiuxian.com/trademanage/order_detail-103399536.htm">查看</a>
												</p> -->
													<p>
														<a class="ope04" href="javascript:;"
															onclick="location.href=&#39;http://pay.jiuxian.com/gopay.htm?orderId=103399536&#39;">付款</a>
													</p>
													<p>
														<a class="ope01 ordPointCancle" href="javascript:;"
															onclick="is_cancel_order(103399536)">取消订单</a>
													</p>
											</td>
										</tr>
									</c:forEach>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<!-- 翻页begin -->
			<div class="uPageBox clearfix">
				<div class="uPage clearfix">
					<a href="javascript:void(0);" class="uPrevpage">上一页</a> <a
						class="num on">1</a> <a href="javascript:void(0)"
						class="uNnextpage">下一页</a>
				</div>
			</div>
			<!-- 翻页end -->
		</div>
	</div>
	<div class="popupMask" style="display: none"></div>

	<jsp:include page="footer.jsp" />
</body>
</html>