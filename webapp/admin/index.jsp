<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>后台管理系统</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="/admin/styles/assets/css/dpl-min.css" rel="stylesheet"
	type="text/css" />
<link href="/admin/styles/assets/css/bui-min.css" rel="stylesheet"
	type="text/css" />
<link href="/admin/styles/assets/css/main-min.css" rel="stylesheet"
	type="text/css" />

<script type="text/javascript"
	src="/admin/styles/assets/js/jquery-1.8.1.min.js"></script>
<script type="text/javascript" src="/admin/styles/assets/js/bui-min.js"></script>
<script type="text/javascript"
	src="/admin/styles/assets/js/common/main-min.js"></script>
<script type="text/javascript"
	src="/admin/styles/assets/js/config-min.js"></script>
</head>
<body>
	<div class="header">
		<div class="dl-title">
			<!--<img src="/chinapost/Public/assets/img/top.png">-->
		</div>
		<div class="dl-log">
			欢迎您，<span class="dl-log-user">root</span><a
				href="/chinapost/index.php?m=Public&a=logout" title="退出系统"
				class="dl-log-quit">[退出]</a>
		</div>
	</div>
	<div class="content">
		<div class="dl-main-nav">
			<div class="dl-inform">
				<div class="dl-inform-title">
					<s class="dl-inform-icon dl-up"></s>
				</div>
			</div>
			<ul id="J_Nav" class="nav-list ks-clear">
				<li class="nav-item dl-selected"><div
						class="nav-item-inner nav-home">系统管理</div></li>
			</ul>
		</div>
		<ul id="J_NavContent" class="dl-tab-conten">
		</ul>
	</div>

	<script>
		BUI.use('common/main', function() {
			var config = [ {
				id : '1',
				menu : [ {
					text : '产品分类',
					items : [ {
						id : '12',
						text : '产品分类',
						href : '/admin/category/list.action'
					} ]
				},
				{
					text : '产品管理',
					items : [ {
						id : '12',
						text : '产品列表',
						href : '/admin/product/list.action'
					} ]
				}]
			} ];
			new PageUtil.MainPage({
				modulesConfig : config
			});
		});
	</script>
</body>
</html>