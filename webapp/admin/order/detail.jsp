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
</head>
<table class="table table-bordered table-hover definewidth m10">
	<tr>
		<td width="10%" class="tableleft">编号</td>
		<td>${order.number }</td>
	</tr>
	<tr>
		<td width="10%" class="tableleft">收货人</td>
		<td>${order.receiver }</td>
	</tr>
	<tr>
		<td width="10%" class="tableleft">收货地址</td>
		<td>${order.address }</td>
	</tr>
	<tr>
		<td width="10%" class="tableleft">商品信息</td>
		<td>
			<table cellpadding="0" cellspacing="0" border="0">
				<tbody>
					<tr>
						<td>商品名称</td>
						<td>单价</td>
						<td>数量</td>
					</tr>
					<c:forEach items="${order.orderProducts }" var="orderProduct">
						<tr>
							<td>
								<div>
									<a href="/detail.action?id=${orderProduct.product.id }"
										target="_blank"> <img
										src="/upload/img/product/logo/${orderProduct.product.logo }"
										width="100px" height="100px" />
									</a> <a href="/detail.action?id=${orderProduct.product.id }"
										target="_blank"> ${orderProduct.product.name }</a>
								</div>
							</td>
							<td>${orderProduct.product.price }</td>
							<td>${orderProduct.count}</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</td>
	</tr>
	<tr>
		<td width="10%" class="tableleft">商品金额</td>
		<td>${order.amount }</td>
	</tr>
	<tr>
		<td width="10%" class="tableleft">总金额</td>
		<td>${order.postage }</td>
	</tr>
	<tr>
		<td width="10%" class="tableleft">邮费</td>
		<td>${order.postage }</td>
	</tr>
	<tr>
		<td width="10%" class="tableleft">优惠</td>
		<td>${order.discount }</td>
	</tr>
	<tr>
		<td width="10%" class="tableleft">总金额</td>
		<td>${order.total }</td>
	</tr>
	<tr>
		<td class="tableleft"></td>
		<td>
			<button type="button" class="btn btn-success"
				onclick="javascript:window.history.go(-1)">返回</button>
		</td>
	</tr>
</table>
</body>
</html>
