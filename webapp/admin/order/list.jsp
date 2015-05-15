<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<jsp:include page="/admin/common.jsp" />
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<script>
	function del(id) {
		if (confirm("确定要删除吗？")) {
			var url = "/admin/order/delete.action?id=" + id;
			window.location.href = url;
		}
	}
</script>
</head>
<body>
	<form class="form-inline definewidth m20" action="/admin/order/list.action" method="post" id="searchForm">
		编号： <input type="text" name="order.number" class="abc input-default"
			value="${order.number }">&nbsp;&nbsp;
		订单状态：
			<select name="order.status">
				<option value="">所有</option>
				<option value="0" <c:if test="${order.status==0 }"> selected="selected"</c:if>>待支付</option>
				<option value="1" <c:if test="${order.status==1 }"> selected="selected"</c:if>>已取消</option>
				<option value="2" <c:if test="${order.status==2 }"> selected="selected"</c:if>>已支付，待发货</option>
				<option value="3" <c:if test="${order.status==3 }"> selected="selected"</c:if>>已发货</option>
				<option value="4" <c:if test="${order.status==4 }"> selected="selected"</c:if>>完成</option>
			</select>
		<button type="submit" class="btn btn-primary">查询</button>
	</form>
	<table class="table table-bordered table-hover definewidth m10">
		<thead>
			<tr>
				<th>编号</th>
				<th>下单时间</th>
				<th>收货人</th>
				<th>地址</th>
				<th>金额</th>
				<th>状态</th>
				<th>操作</th>
			</tr>
		</thead>
		<c:forEach items="${orderList }" var="o">
			<tr>
				<td>${o.number }</td>
				<td><fmt:formatDate value="${o.createTime }" pattern="yyyy-MM-dd HH:mm:ss"/></td>
				<td>${o.receiver }</td>
				<td>${o.address }</td>
				<td>${o.total }</td>
				<td>${o.statusStr }</td>
				<td> 
					<a href="/admin/order/detail.action?id=${o.id }">查看</a>
					<a href="javascript:void(0);" onclick="del(${o.id});">删除</a>
				</td>
			</tr>
		</c:forEach>
	</table>
	<div align="center">
		<s:include value="/pages.jsp">
			<s:set var="commonPageList" value="orderList" />
			<s:param name="formId">
				searchForm
			</s:param>
			<s:param name="formaction">
				/admin/order/list.action
			</s:param>
		</s:include>
	</div>
</body>
</html>