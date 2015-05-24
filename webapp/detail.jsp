<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="common.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>今日特供-${p.name }</title>
<script type="text/javascript">
	$('document').ready(function() {
		$("#buy_now").click(function(){ 
			$("#cartForm").submit();
		}); 
		
		$("#addComment").click(function() { 
			var userId = $("#userId").val();
			if (userId == null || userId == '') {
				alert("请先登录再发表评论，谢谢！");
				return false;
			}
			var content = $("#content").val();
			if (content == null || content == '') {
				alert("评论内容不能为空，谢谢！");
				return false;
			}
			var productId = $("#productId").val();
			var starLevel = $("#starLevel").val();
			
			var url = "ajax_addComment.action";
			var data = {
				'comment.content': content, 
				'comment.userId': userId, 
				'comment.productId': productId,
				'comment.starLevel': starLevel
			};
			$.post(url, data, function(msg) {
				if(msg != ''){
					alert(msg);
					return;
				} else {
					alert('评论成功！');
					window.location.reload();
				}
			});
		});
	});
</script>
</head>
<body>
	<jsp:include page="top.jsp" />

	<div class="detail-box">
		<div class="detail-box-middle" style="margin-top: 8px;">
			<div class="w" style="margin: 0px;">
				<div class="breadcrumb">
					<strong><a href="/">首页</a></strong><span>&nbsp;&gt;&nbsp; <a
						href="/">${p.category.name }</a>&nbsp;&gt;&nbsp;
					</span> <span>${p.name }</span>
				</div>
			</div>
			<div class="detail-box-left">
				<div class="detail-box-left-one">
					<div class="detail-one-left">
						<div class="detail-bigpic">
							<div>
								<img src="/upload/img/product/logo/${p.logo }" id="defaultImg"
									style="border: 1px solid #00DD00;" />
							</div>
						</div>
						<div class="detail-samllpic">
							<ul>
								<li><img
									onmouseover="javascript:showDaTu(&#39;http://127.0.0.1/upload/img/product/logo/${p.logo }&#39;)"
									src="/upload/img/product/logo/${p.logo }"
									style="border: 1px solid #00DD00;" /></li>
							</ul>
						</div>
					</div>
					<div class="detail-one-right">
						<div class="detail-xxone">
							<div class="detail-xx01">
								<h1 class="cp-ming01">${p.name }</h1>
								<p>&nbsp;</p>
								<div class="more-cp">
									<label for="price_5191"> <span class="green01">￥<span
											id="pro_price_5191" class="prod_price">${p.price }</span></span> <span>商品编号:
											${p.code }</span>
									</label>
								</div>
							</div>
						</div>
						<div class="detail-xxtwo-t">
							<div id="summary-stock">规格：${p.spec }</div>
						</div>
						<div class="detail-xxtwo-t">
							<div id="summary-stock">产地：${p.place }</div>
						</div>
						<form action="/addCart.action" method="post" id="cartForm"
							target="_blank">
							<input type="hidden" name="cartItem.productId" value="${p.id }" />
							<div class="detail-xxthree">
								<div class="detail-buy01">
									<span><img onclick="decNum()" src="/images/bag_dec.gif"></span>
									<span><input type="text" id="buy_num"
										name="cartItem.count" value="1" class="number-add"></span> <span><img
										onclick="addNum()" src="/images/bag_add.gif"></span>
								</div>
								<div class="detail-buy02">
									<a href="javascript:void();" id="buy_now" class="buy-now"></a>
								</div>
								<div class="detail-xxfour">
									<h6>商品简介</h6>
									<p>
										<span style="font-size: 13px">${p.descrip }</span> <br>
									</p>
								</div>
							</div>
						</form>
					</div>

					<div class="detail-box-left-js">
						<div class="detail-js-title">
							<a href="javascript:void(0);" class="now-js" id="sp-xq">商品详情</a>
						</div>
						<div class="detail-js-pl" id="pro_detail">
							<p class="p0" style="margin-top: 0pt; margin-bottom: 0pt">
								${p.detail }</p>
							<p class="p0" style="margin-top: 0pt; margin-bottom: 0pt">&nbsp;</p>
							<p></p>
						</div>

						<div class="detail-js-title">
							<a href="javascript:void(0);" class="now-js" id="sp-xq">用户评论</a>
						</div>
						<div class="detail-allsays01">
							<c:forEach items="${commentList }" var="comment">
								<div class="detail-user-says">
									<div class="detail-user-says-left">
										<img src="/images/logo/user.jpg" style="width:50px;">
									</div>
									<div class="detail-user-says-right">
										<ul>
											<li><c:if test="${empty comment.user }">
													匿名用户
												</c:if> <c:if test="${!empty comment.user }">
													${comment.user.username }
												</c:if></li>
											<li>${comment.content }</li>
											<li>
												<p class="user-ping">
													<c:forEach begin="1" end="${comment.starLevel }">
														<span class="star"></span>
													</c:forEach>
												</p> <span class="gray"><fmt:formatDate
														value="${comment.createTime }"
														pattern="yyyy-MM-dd HH:mm:ss" /> </span>
											</li>
										</ul>
									</div>
								</div>
							</c:forEach>
							<input type="hidden" id="userId" name="comment.userId" value="${sessionScope.sessionUser.id }" />
							<input type="hidden" id="productId" name="comment.productId" value="${p.id }"/>
							<div class="detail-user-says">
								我要评论
								<div class="detail-user-says-left">
								</div>
								<div class="detail-user-says-right">
									<ul>
										<li>星级：<br /> 
											<c:forEach begin="1" end="5" varStatus="i">
												<p class="user-ping" style="width:100px;">
													<label>
														<input type="radio" name="comment.starLevel" value="${i.count }" <c:if test="${i.count==5 }"> id="starLevel" checked="checked"</c:if>>
														<c:forEach begin="1" end="${i.count }">
															<span class="star"></span>
														</c:forEach>
													</label>
												</p>
											</c:forEach> 
										</li>
										<li><textarea style="height:100px;" cols="80"
												name="comment.content" id="content"></textarea></li>
										<li>
											<input type="button" id="addComment" value="发表评论">
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="detail-box-right">
				<!--viewed start-->
				<!-- <div class="detail-right-history01" id="detail_recent_product"
					style="display: none;">
					<div class="title_Browse">
						<p>最近浏览过的商品</p>
					</div>
					<div class="title_Browse_box"></div>
				</div> -->
				<!--viewed end-->
				<div class="detail-right-history01">
					<div class="title_Browse">
						<p style="font-family:微软雅黑;">热销人气商品</p>
					</div>
					<div class="title_Browse_box">
						<c:forEach items="${hotProductList }" var="p">
							<div class="Browse_box1 ">
								<dl>
									<dt>
										<a target="_blank" href="detail.action?id=${p.id }"><img
											src="/upload/img/product/logo/${p.logo }" width="80"
											height="78"></a>
									</dt>
									<dd>
										<a target="_blank" href="detail.action?id=${p.id }">${p.name }</a>
									</dd>
									<dd class="font_2">现价：￥${p.price }</dd>
								</dl>
							</div>
						</c:forEach>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--详情部分结束-->

	<!--mini cart-->
	<div class="cartmini-box" style="display: none">
		<div class="cartmini-fix">
			<p class="green01">已成功加入购物车</p>
			<p class="green03">
				购物车共有 <span class="red" id="overlay_cartnum">0</span>件商品，合计：<span
					class="red" id="overlay_cartmoney">￥0</span>
			</p>
			<div>
				<ul>
					<li><a href="javascript:void(0);"
						style="text-decoration: none;" class="btn-cart02" id="close-other">继续逛逛</a></li>
					<li><a href="http://www.fruitday.com/showcart"
						style="text-decoration: none;" class="btn-cart01">去结算</a></li>
				</ul>
			</div>
			<div class="close-other"></div>

		</div>
	</div>

	<jsp:include page="footer.jsp" />
</body>
</html>