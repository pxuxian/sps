<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css"
	href="/admin/styles/Css/bootstrap.css" />
<link rel="stylesheet" type="text/css"
	href="/admin/styles/Css/bootstrap-responsive.css" />
<link rel="stylesheet" type="text/css"
	href="/admin/styles/Css/style.css" />
<script type="text/javascript" src="/admin/styles/Js/jquery.js"></script>
<script type="text/javascript" src="/admin/styles/Js/jquery.sorted.js"></script>
<script type="text/javascript" src="/admin/styles/Js/bootstrap.js"></script>
<script type="text/javascript" src="/admin/styles/Js/ckform.js"></script>
<script type="text/javascript" src="/admin/styles/Js/common.js"></script>
<style type="text/css">
body {
	padding-bottom: 40px;
}

.sidebar-nav {
	padding: 9px 0;
}

@media ( max-width : 980px) {
	/* Enable use of floated navbar text */
	.navbar-text.pull-right {
		float: none;
		padding-left: 5px;
		padding-right: 5px;
	}
}
</style>
</head>
<body>
	<c:if test="${empty sessionUser }">
		<%
			response.sendRedirect("login.jsp");
		%>
	</c:if>
	<c:if test="${sessionUser.role.id != 100 }">
		<%
			response.sendRedirect("index.jsp");
		%>
	</c:if>
</body>
</html>