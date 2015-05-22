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
<title>今日特供-个人信息</title>
<script type="text/javascript">
$('document').ready(function() {
	$('#modifyPwd').click(function() {
		var pass1 = $('#password1').val();
        var pass2 = $('#password2').val();
		if(pass1.length<=0) {
			alert("请输入密码！");
			return false;
		} else if(pass1 != pass2){
			alert("您两次输入的密码不一致！");
			return false;
        }
        $("#userInfoForm").submit();
	});
});
</script>
</head>
<body>
	<jsp:include page="top.jsp" />
	<div class="user clearfix">
		<!-- 左侧导航begin -->
		<jsp:include page="nav.jsp" />

		<div class="rightBox">
			<div class="rightTit">
				<h2>
					<i></i>修改密码
				</h2>
			</div>
			<div class="rightCon">
				<div class="myordCon" style="font-family: 微软雅黑;">
					<form action="/modifyPwd.action" method="post" id="userInfoForm">
						<table>
							<tr>
								<td width="100px" style="font-size: 15px">用户名：</td>
								<td width="500px" style="font-size: 15px">${user.username }</td>
							</tr>
							<tr>
								<td width="100px" style="font-size: 15px">新密码：</td>
								<td width="500px" style="font-size: 15px"><input type="password"
									name="user.password" id="password1" /></td>
							</tr>
							<tr>
								<td width="100px" style="font-size: 15px">确认密码：</td>
								<td width="500px" style="font-size: 15px"><input type="password"
									id="password2" /></td>
							</tr>
							<tr>
								<td width="100px" style="font-size: 15px"></td>
								<td width="500px" style="font-size: 15px">
									<input type="button" id="modifyPwd" value="修改" />
								</td>
							</tr>
						</table>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div class="popupMask" style="display: none"></div>

	<jsp:include page="footer.jsp" />
</body>
</html>