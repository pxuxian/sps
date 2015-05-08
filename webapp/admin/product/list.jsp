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
	$(function() {
		$('#addnew').click(function() {
			window.location.href = "/admin/product/toAdd.action";
		});
	});

	function del(id) {
		if (confirm("确定要删除吗？")) {
			var url = "/admin/product/delete.action?p.id=" + id;
			window.location.href = url;
		}
	}
</script>
</head>
<body>
	<form class="form-inline definewidth m20" action="/admin/product/list.action" method="post" id="searchForm">
		编号： <input type="text" name="p.code" class="abc input-default"
			value="${p.code }">&nbsp;&nbsp;
		名称： <input type="text" name="p.name" class="abc input-default"
			value="${p.name }">&nbsp;&nbsp;
		<button type="submit" class="btn btn-primary">查询</button>
		&nbsp;&nbsp;
		<button type="button" class="btn btn-success" id="addnew">新增</button>
	</form>
	<table class="table table-bordered table-hover definewidth m10">
		<thead>
			<tr>
				<th>编号</th>
				<th>分类</th>
				<th>名称</th>
				<th>描述</th>
				<th>价格</th>
				<th>操作</th>
			</tr>
		</thead>
		<c:forEach items="${productList }" var="p">
			<tr>
				<td>${p.code }</td>
				<td>${p.category.name }</td>
				<td>${p.name }</td>
				<td>${p.descrip }</td>
				<td>${p.price }</td>
				<td><a href="/admin/product/toModify.action?p.id=${p.id }">编辑</a>
					&nbsp; <a href="javascript:void(0)" onclick="del(${p.id})">删除</a>
				</td>
			</tr>
		</c:forEach>
	</table>
	<div align="center">
		<s:include value="/pages.jsp">
			<s:set var="commonPageList" value="productList" />
			<s:param name="formId">
				searchForm
			</s:param>
			<s:param name="formaction">
				/admin/product/list.action
			</s:param>
		</s:include>
	</div>
</body>
</html>