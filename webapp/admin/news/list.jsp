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
			window.location.href = "/admin/news/add.jsp";
		});
	});

	function del(id) {
		if (confirm("确定要删除吗？")) {
			var url = "/admin/news/delete.action?id=" + id;
			window.location.href = url;
		}
	}
</script>
</head>
<body>
	&nbsp; &nbsp; &nbsp; 
	<button type="button" class="btn btn-success" id="addnew">新增</button>
	<table class="table table-bordered table-hover definewidth m10">
		<thead>
			<tr>
				<th>编号</th>
				<th>标题</th>
				<th>内容</th>
				<th>操作</th>
			</tr>
		</thead>
		<c:forEach items="${newsList }" var="news">
			<tr>
				<td>${news.id }</td>
				<td>${news.title }</td>
				<td>
				 	<c:out value="${fn:substring(news.content, 0, 20)}" /> ...
				 </td>
				<td><a href="/admin/news/toModify.action?id=${news.id }">编辑</a>
					&nbsp; <a href="javascript:void(0)" onclick="del(${news.id})">删除</a>
				</td>
			</tr>
		</c:forEach>
	</table>
	<div align="center">
		<s:include value="/pages.jsp">
			<s:set var="commonPageList" value="newsList" />
			<s:param name="formId">
				searchForm
			</s:param>
			<s:param name="formaction">
				/admin/news/list.action
			</s:param>
		</s:include>
	</div>
</body>
</html>