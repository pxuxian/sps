<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="common.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>详情页</title>
</head>
<body>
	<jsp:include page="top.jsp" />

	<!--详情部分开始-->
	<div id="detail">
		<div class="tit">
			<i class="closes"><img src="./images/fancy_closebox.png"
				width="30" height="30" /> </i>
		</div>
		<img id="fday_mv" src="" width="500px">
	</div>

	<div class="detail-box">
		<div class="detail-box-middle" style="margin-top: 15px;">
			<div class="w" style="margin: 0px;">
				<div class="breadcrumb">
					<strong><a href="/">首页</a></strong><span>&nbsp;&gt;&nbsp; <a
						href="">鲜果区</a>&nbsp;&gt;&nbsp; <a href="">橙</a>&nbsp;&gt;&nbsp;
					</span> <span>新奇士美国脐橙</span>
				</div>
			</div>
			<div class="detail-box-left">
				<div class="detail-box-left-one">
					<div class="detail-one-left">
						<div class="detail-bigpic">
							<div>
								<img src="./images/1-370x370-3444-1AXHAP8C.jpg" id="defaultImg">
							</div>
						</div>
						<div class="detail-samllpic">
							<ul>
								<li><img
									onmouseover="javascript:showDaTu(&#39;http://cdn.fruitday.com/product_pic/3444/1/1-370x370-3444-1AXHAP8C.jpg&#39;)"
									src="./images/1-180x180-3444-1AXHAP8C.jpg"></li>
								<li><img
									onmouseover="javascript:showDaTu(&#39;http://cdn.fruitday.com/product_pic/3444/2/2-370x370-3444-S82249FR.jpg&#39;)"
									src="./images/2-180x180-3444-S82249FR.jpg"></li>
								<li><img
									onmouseover="javascript:showDaTu(&#39;http://cdn.fruitday.com/product_pic/3444/3/3-370x370-3444-S82249FR.jpg&#39;)"
									src="./images/3-180x180-3444-S82249FR.jpg"></li>
							</ul>
						</div>
					</div>
					<div class="detail-one-right">
						<div class="detail-xxone">
							<div class="detail-xx01">
								<h1 class="cp-ming01">新奇士美国脐橙</h1>
								<p>&nbsp;</p>
								<div class="more-cp">
									<label for="price_5191"> <span style="font-size: 18px;">￥<span
											id="pro_price_5191" class="prod_price">78</span></span> <span>商品编号:2150409105</span>
									</label>
								</div>
							</div>
						</div>

						<!--detail-xxtwo-t start-->
						<div class="detail-xxtwo-t">
							<div class="contbox">
								<div id="summary-stock"></div>
							</div>
						</div>
						<!--detail-xxtwo-t end-->

						<div class="detail-xxthree">
							<div class="detail-buy01">
								<span><img
									onclick="cutnum(&#39;http://www.fruitday.com/&#39;,&#39;3444&#39;,&#39;0&#39;)"
									src="./images/bag_close.gif"></span> <span><input
									id="buy_num" type="text" value="1" class="number-add"></span>
								<span><img
									onclick="addnum(&#39;http://www.fruitday.com/&#39;,&#39;3444&#39;,&#39;0&#39;)"
									src="./images/bag_open.gif"></span>
							</div>
							<div class="detail-buy02">
								<input type="hidden" id="is_upto_pro_3444" value="false">
								<a href="javascript:void(0)" id="buy" class="buy-now"></a>
							</div>
							<div class="detail-buy03">
								<a href="javascript:void(0);" id="prod_care" class="buy-care"></a>
							</div>

							<div class="detail-xxfour">
								<h6>商品简介</h6>
								<!-- <p class="miaoshu"></p> -->
								<p>
									<span style="font-size: 13px">天天果园精选</span><span
										style="font-size: 13px">百年历史品牌</span><span
										style="font-size: 13px">美国新奇士Sunkist脐橙水分充足，酸甜爽口，橙香浓郁。含丰富的维生素C、植物纤维素，超低卡路里，是美味健康的好伙伴。</span><span
										style="font-size: 13px"><br> <br></span>
								</p>
								<h6>温馨提示</h6>
								<p></p>
								<p>
									<span style="font-size: 13px">冰箱冷藏后的脐橙更加清凉甘甜。</span>
								</p>
								<p></p>
							</div>

						</div>
					</div>

					<div class="detail-box-left-js">
						<div class="detail-js-title">
							<a href="javascript:void(0);" class="now-js" id="sp-xq">商品详情</a>
							<a href="javascript:void(0);" id="sp-pl">顾客评论(1442)</a> <a
								href="javascript:void(0);"
								style="float: right; width: 568px; text-align: right; text-decoration: none;"
								onclick="do_comment()">发布评价即可获10积分，APP上传图片并晒单即可获得20积分，前5名可获双倍积分</a>
						</div>
						<div class="detail-js-pl" id="pro_detail">
							<p class="detail-pl01">
								<span>产地：美国</span> <span>净重：单个重量约220克-250克</span>
							</p>
							<p></p>
							<p></p>
							<p class="p0" style="margin-top: 0pt; margin-bottom: 0pt">
								<img alt="新奇士美国脐橙详情图1" src="./images/1423710059.jpg"
									class="lazy"
									data-original="http://cdn.fruitday.com/up_images/1423710059.jpg"
									style="display: inline;">
							</p>
							<p class="p0" style="margin-top: 0pt; margin-bottom: 0pt">&nbsp;</p>
							<p></p>
						</div>
					</div>

					<div class="detail-start" id="pro_pl_title">顾客评论</div>

					<div class="detail-discuss" id="pro_pl_body">
						<div class="detail-user">
							<div class="detail-user-title">
								<ul>
									<li class="now-gray" id="c_all">全部评论(<span>1442</span>)
									</li>
								</ul>
							</div>
							<div class="detail-allsays">
								<div class="detail-allsays01">
									<div class="detail-user-says">
										<div class="detail-user-says-left">
											<img src="./images/head_pic.jpg">
										</div>
										<div class="detail-user-says-right">
											<div align="left">匿名用户</div>
											<ul>
												<li>快递速度快，新鲜多汁</li>
												<li><p class="user-ping">
														<span class="star"></span><span class="star"></span><span
															class="star"></span><span class="star"></span><span
															class="star"></span>
													</p> <span class="gray">2015-04-10 22:41:40</span></li>
											</ul>
										</div>
									</div>
									<div class="detail-user-says">
										<div class="detail-user-says-left">
											<img src="./images/head_pic.jpg">
										</div>
										<div class="detail-user-says-right">
											<div align="left">Wing</div>
											<ul>
												<li>最喜欢的橙子种类。啥时候再出呀？</li>
												<li><p class="user-ping">
														<span class="star"></span><span class="star"></span><span
															class="star"></span><span class="star"></span><span
															class="star"></span>
													</p> <span class="gray">2015-04-10 08:07:18</span></li>
											</ul>
										</div>
									</div>
								</div>
								<div class="detail-page">
									<div class="detail-page-number" style="width: 100%;">
										<a href="javascript:void(0);" val="1" star="">‹ 首页</a><a
											href="javascript:void(0);" val="1" star="">上一页</a><a
											href="javascript:void(0);" val="1" star="all"><strong><font
												color="orange"><b>1</b></font></strong></a><a href="javascript:void(0);"
											val="2" star="all">2</a><a href="javascript:void(0);" val="2"
											star="all">下一页</a><a href="javascript:void(0);" val="144"
											star="all">最后一页 ›</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="detail-box-right">
				<!--viewed start-->
				<div class="detail-right-history01" id="detail_recent_product"
					style="display: none;">
					<div class="title_Browse">
						<p>最近浏览过的商品</p>
					</div>
					<div class="title_Browse_box"></div>
				</div>
				<!--viewed end-->
				<div class="detail-right-history01">
					<div class="title_Browse">
						<p>热销人气商品</p>
						<span> <a href="">MORE+</a>
						</span>
					</div>
					<div class="title_Browse_box">
						<c:forEach begin="1" end="4">
							<div class="Browse_box1 ">
								<dl>
									<dt>
										<a target="_blank" href=""><img
											src="./images/1-180x180-56-BARP99Y5.jpg" width="80"
											height="78"></a>
									</dt>
									<dd>
										<a target="_blank" href="">世界一号苹果</a>
									</dd>
									<dd class="font_2">现价：￥99</dd>
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