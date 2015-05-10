<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>今日特供-用户登录</title>

<link href="./styles/reg.css" rel="stylesheet" type="text/css"></link>
<link href="./styles/login.css" rel="stylesheet" type="text/css"></link>
<script src="./styles/jquery-1.6.2.min.js" type="text/javascript"></script>
<script src="./styles/jquery.alerts.js" type="text/javascript"></script>

<script type="text/javascript">
$('document').ready(function() {
	$('#sub').click(function() {
		var flag = false;
		var username = $('#username').val();
		$('#username').focus(function(){$(this).next().text("");});
        if (username.length<=0){
			$(this).next().text("请输入用户名");
            return false;
		}
        var pass = $('#password').val();
        $('#password').focus(function(){$(this).next().text("");});
		if(pass.length<=0){
			$('#password').next().text("请输入密码");
			return false;
		}
		var url = "ajax_login.action";
		var data = {'user.username':username, 'user.password':pass};
		$.ajaxSetup({   
            async : false  
        });
		$.post(url, data, function(msg) {
			if(msg != ''){
				$('#password').next().text("用户名或密码不正确!");
				return false;
			}
			flag = true;
		});
		if (flag == true) {
			$("#loginForm").submit();
		}
	});
});
</script>
</head>
<body>
	<div class="wrapper">
		<div class="nav">
			<a href="/">首页</a> >>
			<a class="on" href="login.jsp">登录</a>
		</div>
		<div class="main clearfix">
			<div class="login_box">
				<div class="login_con">
					<form action="login.action" id="loginForm" method="post">
						<div class="control-group">
							<label class="control-label" for="input02">账号</label>
							<div class="controls">
								<input type="text" class="input-xlarge" id="username"
									name="user.username" />
								<p
									style="color: red; height: 10px; font-size: 10px; position: relative; top: -5px;"></p>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="input03">密码</label>
							<div class="controls">
								<input type="password" class="input-xlarge" id="password"
									name="user.password" />
								<p
									style="color: red; height: 10px; font-size: 10px; position: relative; top: -5px;"></p>
							</div>
						</div>
						<div class="control-group">
							<div class="controls">
								<input type="button" id="sub" value="登录" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>