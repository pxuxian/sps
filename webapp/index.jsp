<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<meta name="keywords" content="今日特供,特产,农村特产,土特产,土特产专卖,绿色食品" />
<meta name="description" content="今日特供,特产,农村特产,土特产,土特产专卖,绿色食品" />
<title>今日特供-莫笑农家腊酒浑，丰年留客足鸡豚</title>
</head>
<body>
	<%
		String cid = request.getParameter("cid");
		if (cid != null) {
	%>
	<jsp:forward page="/index.action">
		<jsp:param name="cid" value="cid" />
	</jsp:forward>
	<%
		} else {
	%>
	<jsp:forward page="/index.action" />
	<%
		}
	%>
</body>
</html>