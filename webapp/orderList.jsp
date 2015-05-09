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
						<div class="os-search">
							<input type="text" id="orderKey" name="orderKey" value="" /><em>
								订单编号、商品名称、商品编号 </em><a style="cursor: pointer"
								onclick="queryOrderForm();"><i></i>查询</a>
						</div>
						<div class="os-time">
							<select name="timeFlag">
								<option value="0">全部时间</option>
								<option value="1">最近三个月</option>
								<option value="2">今年内</option>
								<option value="3">2014年</option>
								<option value="4">2013年</option>
								<option value="5">2013年以前</option>
							</select>
						</div>
					</div>
				</form>
			</div>
			<div class="rightCon">
				<div class="myordCon">
					<ul class="moConHead">
						<li class="moh1">商品信息</li>
						<li class="moh2">收货人</li>
						<li class="moh3">实付金额</li>
						<li class="moh4">
							<div class="moh-status">
								<select id="status" name="status" onchange="changeStatus();">
									<option value="9" selected="">全部状态</option>
									<option value="0">等待付款</option>
									<option value="5">处理中</option>
									<option value="6">等待收货</option>
									<option value="7">已完成</option>
									<option value="2">已取消</option>
									<option value="8">退货</option>
								</select>
							</div>
						</li>
						<li class="moh5">操作</li>
						<div class="clear"></div>
					</ul>
					<div class="moConBoxEmpty">
						<div class="moConBoxEmptyFrame">
							<i></i><span>暂无订单，这就去挑选商品：<a
								href="http://www.jiuxian.com/" target="_blank">酒仙网首页</a></span>
						</div>
					</div>

				</div>
			</div>
			<!-- 翻页begin -->
			<!-- 翻页end -->
		</div>
		<!-- 右侧 -->
	</div>
	<div class="popupMask" style="display: none"></div>
	<jsp:include page="footer.jsp" />
</body>
</html>