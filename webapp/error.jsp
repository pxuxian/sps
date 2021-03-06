<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="common.jsp"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control"
	content="no-cache,no-store, must-revalidate" />
<meta http-equiv="expires" content="0" />
<title>今日特供-出错了</title>
</head>

<body>
	<jsp:include page="top.jsp" />
	<div class="detail-box">
		<div class="detail-box-middle" style="margin-top: 8px;">
			<div class="w" style="margin: 0px;">
				<div class="breadcrumb">
					<img src="/images/logo/error.jpg" alt="" width="180px" height="140px" /> 
					<span style="font-size: 15px">
						<c:if test="${!empty msg }">
							${msg }。 
						</c:if>
						<c:if test="${empty msg }">
							不好意思，出错了，请重试或联系管理员。
						</c:if>
						<strong><a href="/">返回首页</a></strong>
						<c:if test="${!empty sessionUser }">
							<strong><a href="/myOrder.action"> 我的订单</a></strong>
						</c:if>
					</span> 
					<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
				</div>
			</div>
		</div>
	</div>
	<jsp:include page="footer.jsp" />
</body>
</html>