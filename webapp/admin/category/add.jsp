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
<script src="/admin/ckeditor/ckeditor.js"></script>
</head>
<form action="/admin/category/add.action" method="post">
	<table class="table table-bordered table-hover definewidth m10">
		<tr>
			<td width="10%" class="tableleft">名称</td>
			<td><input type="text" name="pc.name" /></td>
		</tr>
		<tr>
			<td class="tableleft"></td>
			<td>
				<button type="submit" class="btn btn-primary" type="button">保存</button>&nbsp;&nbsp;
				<button type="button" class="btn btn-success"
					onclick="javascript:window.history.go(-1)">返回</button>
			</td>
		</tr>
	</table>
</form>
</body>
</html>
