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
<title>今日特供-操作成功</title>
</head>
<body>
	<jsp:include page="top.jsp" />
	<div class="user clearfix">
		<jsp:include page="nav.jsp" />

		<div class="rightBox">
			<div class="rightTit">
				<h2>
					<i></i>操作成功
				</h2>
			</div>
			<div class="rightCon">
				<div class="myordCon" style="font-family: 微软雅黑;">
					<img src="/images/logo/success.gif" alt="" width="60px" height="60px" /> 
					<span style="font-size: 13px">
						<br /> &nbsp; &nbsp; 
						${msg }
					</span>
				</div>
			</div>
		</div>
	</div>
	<div class="popupMask" style="display: none"></div>

	<jsp:include page="footer.jsp" />
</body>
</html>