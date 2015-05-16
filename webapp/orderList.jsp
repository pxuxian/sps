<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="common.jsp"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="./styles/base-order.css" type="text/css" rel="stylesheet"></link>
<link href="./styles/header.css" rel="stylesheet" type="text/css"></link>
<link href="./styles/menu.css" type="text/css" rel="stylesheet"></link>
<link href="./styles/user.css" rel="stylesheet" type="text/css"></link>
<link href="./styles/user_nav.css" rel="stylesheet" type="text/css"></link>
<link href="./styles/user_1200.css" id="newLink" rel="stylesheet"
	type="text/css"></link>
<title>今日特供-我的订单</title>

</head>

<body>
	<jsp:include page="top.jsp" />

	<div class="user clearfix">
		<div class="uBread">
			<a href="javascript:;">交易管理</a><i>&gt;</i><em>我的订单</em>
		</div>
		<!-- 左侧导航begin -->
		<div class="sideNav">
			<h1>
				<a href="/"><i></i><span>我的特供</span></a>
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
				<form id="orderForm" name="orderForm" action="myOrder.action"
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
				<div class="myordCon" style="font-family:微软雅黑;">
					<ul class="moConHead" style="width: 982px;">
						<li class="moh1">商品信息</li>
						<li class="moh2">价格</li>
						<li class="moh3">数量</li>
						<li class="moh4">金额</li>
						<li class="moh5">操作</li>
					</ul>
					<c:if test="${empty orderList }">
						<div class="moConBoxEmpty">
							<div class="moConBoxEmptyFrame">
								<i></i><span>暂无订单</span>
							</div>
						</div>
					</c:if>
					<br /> <br />
					<c:forEach items="${orderList }" var="order">
						<div class="moConBox">
							<div class="moCon-ord">
								<div class="ord-num">
									订单编号：<span style="color:blue;">${order.number }</span><i>|</i>
									<span class="ord-tim">下单时间：<em><fmt:formatDate value="${order.createTime }" pattern="yyyy-MM-dd HH:mm:ss" /></em></span>
								</div>
								<table class="ord-detailTab" cellpadding="0" cellspacing="0"
									border="0">
									<tbody>
										<c:forEach items="${order.orderProducts }" var="orderProduct"
											varStatus="rownum">
											<tr class="ord-detailTab">
												<td class="tdmoh1">
													<div class="ordPicBox clearfix">
														<a class="proId" href="detail.action?id=${orderProduct.product.id }" target="_blank">
															<img
															src="/upload/img/product/logo/${orderProduct.product.logo }"
															width="50" height="50" />
														</a> <a class="proId" href="detail.action?id=${orderProduct.product.id }"
															target="_blank"> ${orderProduct.product.name } </a>
													</div>
												</td>
												<td class="tdmoh2">${orderProduct.product.price }</td>
												<td class="tdmoh3">${orderProduct.count}</td>
												<c:if test="${rownum.count == 1 }">
													<td class="tdmoh4" rowspan="${order.count }">
														<p class="ord-price">¥${order.total }</p>
														<p class="ord-price">（含运费：${order.postage }）</p>
													</td>
													<td class="tdmoh5" rowspan="${order.count }">
														<p class="opePending">
															<span style="color: #FFAA00;">${order.statusStr }</span>
														</p>
														<c:if test="${order.status == 0 }">
															<p>
																<a class="ope04" href="javascript:;" onclick="">付款</a>
															</p>
															<%-- <p>
																<a class="ope01 ordPointCancle"
																	href="javascript:void(0);"
																	onclick="cancelOrder(${order.id })">取消订单</a>
															</p> --%>
														</c:if>
													</td>
												</c:if>
											</tr>
										</c:forEach>
									</tbody>
								</table>
							</div>
						</div>
					</c:forEach>
				</div>
			</div>
			<!-- 翻页begin -->
			<!-- <div class="uPageBox clearfix">
				<div class="uPage clearfix">
					<a href="javascript:void(0);" class="uPrevpage">上一页</a> <a
						class="num off">1</a> <a href="javascript:void(0)"
						class="uNnextpage">下一页</a>
				</div>
			</div> -->
			<div align="center">
				<s:include value="/pages.jsp">
					<s:set var="commonPageList" value="orderList" />
					<s:param name="formId">
						orderForm
					</s:param>
					<s:param name="formaction">
						/myOrder.action
					</s:param>
				</s:include>
			</div>
			<!-- 翻页end -->
		</div>
	</div>
	<div class="popupMask" style="display: none"></div>

	<jsp:include page="footer.jsp" />
</body>
</html>