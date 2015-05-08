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
<form action="/admin/product/update.action" method="post" enctype="multipart/form-data">
	<input type="hidden" name="p.id" value="${p.id }">
	<table class="table table-bordered table-hover definewidth m10">
		<tr>
			<td width="10%" class="tableleft">分类</td>
			<td>
				<select name="p.categoryId">
					<option value="-1" 
						<c:if test="${p.category.id == -1 }">selected="selected"</c:if>></option>
					<c:forEach items="${pcList }" var="pc">
						<option value="${pc.id }" 
							<c:if test="${p.category.id == pc.id }">selected="selected"</c:if>>
							${pc.name }
						</option>
					</c:forEach>
				</select>
			</td>
		</tr>
		<tr>
			<td width="10%" class="tableleft">编号</td>
			<td><input type="text" name="p.code" value="${p.code }" /></td>
		</tr>
		<tr>
			<td width="10%" class="tableleft">名称</td>
			<td><input type="text" name="p.name" value="${p.name }" /></td>
		</tr>
		<tr>
			<td width="10%" class="tableleft">描述</td>
			<td>
				<textarea rows="10" cols="50" name="p.descrip">${p.descrip }</textarea>
			</td>
		</tr>
		<tr>
			<td width="10%" class="tableleft">价格</td>
			<td><input type="text" name="p.price" value="${p.price }" /></td>
		</tr>
		<tr>
			<td width="10%" class="tableleft">主页展示</td>
			<td>
				<select name="p.sectionId">
					<option value="-1" <c:if test="${p.sectionId == -1 }">selected="selected"</c:if>></option>
					<option value="1" <c:if test="${p.sectionId == 1 }">selected="selected"</c:if>>今日特供</option>
					<option value="2" <c:if test="${p.sectionId == 2 }">selected="selected"</c:if>>优惠专区</option>
				</select> &nbsp; 
				<img alt="" src="/upload/img/product/logo/${p.logo }" />
				<input type="file" name="logoFile" />  
			</td>
		</tr>
		<tr>
			<td class="tableleft">产品详情</td>
			<td>
				<textarea name="p.detail" id="editor1" rows="10" cols="80">
					${p.detail }
            	</textarea>
            	<script>
            		CKEDITOR.replace('editor1', {  
            	    	filebrowserImageUploadUrl : '/uploadPic.action',
            		}); 
            	</script>
			</td>
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
