<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
<title>今日特供-用户注册</title>

<meta name="keywords" content="水果,果切,鲜果,新鲜,健康" />
<link href="./styles/reg.css" rel="stylesheet" type="text/css"></link>
<link href="./styles/login.css" rel="stylesheet" type="text/css"></link>
<script src="./styles/jquery-1.6.2.min.js" type="text/javascript"></script>
<script src="./styles/jquery.alerts.js" type="text/javascript"></script>

<script type="text/javascript">
$('document').ready(function() {
	var userNameFlag = true;
	$('#username').blur(function(){
		var username = $('#username').val();
		$('#username').focus(function(){$(this).next().text("");});
        if (username.length<4 || username.length>12){
			$(this).next().text("用户名长度不符合，长度应大于4个字符或小于12个字符");
			userNameFlag = false;
            return false;
		}
		var url = "ajax_reg.action";
		var data = {'user.username':username};
		$.post(url, data, function(msg) {
			if(msg != '0'){
				$('#username').next().text("sorry,已经有这个名字了，请您更换一个!");
				userNameFlag = false;
				return;
			} else {
				userNameFlag = true;
			}
		});
	});
	
	$('#sub').click(function() {
		if (userNameFlag == false) {
			$('#username').next().text("sorry,已经有这个名字了，请您更换一个!");
			return false;
		}
        var flogs = true;
        var pass = $('#password').val();
        var pass2 = $('#password2').val();
        $('#password').focus(function(){$(this).next().text("");});
        $('#password2').focus(function(){$(this).next().text("");});
        //var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(pass.length<6 || pass.length>18){
			$('#password').next().text("为了您的账户安全，密码至少得设置6个字符");
			flogs = false;
		}else if(pass != pass2){
			$('#password2').next().text("sorry,您两次输入的密码不一致");
			flogs = false;
        }
        if(flogs == false){
            return false;
        }
        $("#regForm").submit();
	});
});
</script>
</head>
<body>
	<div class="wrapper">
		<div class="nav">
			<a href="/">首页</a> >>
			<a class="on" href="reg.jsp">注册</a>
		</div>
		<div class="main clearfix">
			<div class="login_box">
				<span>成为会员</span>
				<div class="login_con">
					<form action="reg.action" id="regForm" method="post">
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
							<label class="control-label" for="input04">确认密码</label>
							<div class="controls">
								<input type="password" class="input-xlarge" id="password2" />
								<p
									style="color: red; height: 10px; font-size: 10px; position: relative; top: -5px;"></p>
							</div>
						</div>
						<div class="control-group">
							<div class="controls">
								<input type="button" id="sub" value="注册" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>