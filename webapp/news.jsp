<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="common.jsp"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>今日特供-新闻</title>
</head>
<body>
	<jsp:include page="top.jsp" />

	<div class="cartWrap">
		<div class="cartMain">
			<div class="div-content">${news.content }</div>
		</div>
	</div>
	<jsp:include page="footer.jsp" />
</body>
</html>