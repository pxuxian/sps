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
<title>今日特供-成功</title>
</head>

<body>
	<jsp:include page="top.jsp" />
	<div class="detail-box">
		<div class="detail-box-middle" style="margin-top: 8px;">
			<div class="w" style="margin: 0px;">
				<div class="breadcrumb">
					<img src="/images/logo/success.gif" alt="" width="150px" height="150px" /> 
					<span style="font-size: 15px">
						${msg }
						<c:if test="${!empty sessionScope.sessionUser }">
							<strong><a href="myOrder.action">我的订单</a></strong>
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