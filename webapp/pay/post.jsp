<%@ page contentType="text/html; charset=UTF-8" language="java" pageEncoding="UTF-8" import=" com.allinpay.ets.client.*" errorPage="" %>
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<title>通联网上支付平台-商户接口范例-支付请求信息签名</title>
	</head>
	<body>
	<center> <h2>支付请求信息签名</h2></center>	
	<%	
	//页面编码要与参数inputCharset一致，否则服务器收到参数值中的汉字为乱码而导致验证签名失败。
	request.setCharacterEncoding("UTF-8"); 

	String serverUrl = request.getParameter("serverUrl");
	String key=request.getParameter("key");
	String version=request.getParameter("version");
	String language=request.getParameter("language");
	String inputCharset= request.getParameter("inputCharset");
	String merchantId=request.getParameter("merchantId");
	String pickupUrl=request.getParameter("pickupUrl");
	String receiveUrl=request.getParameter("receiveUrl");
	String payType=request.getParameter("payType");
	String signType=request.getParameter("signType");
	String orderNo=request.getParameter("orderNo");
	String orderAmount=request.getParameter("orderAmount");
	String orderDatetime=request.getParameter("orderDatetime");
	String orderCurrency=request.getParameter("orderCurrency");
	String orderExpireDatetime=request.getParameter("orderExpireDatetime");
	String payerTelephone=request.getParameter("payerTelephone");
	String payerEmail=request.getParameter("payerEmail");
	String payerName=request.getParameter("payerName");
	String payerIDCard=request.getParameter("payerIDCard");
	String pid=request.getParameter("pid");
	String productName=request.getParameter("productName");
	String productId=request.getParameter("productId");
	String productNum=request.getParameter("productNum");
	String productPrice=request.getParameter("productPrice");
	String productDesc=request.getParameter("productDesc");
	String ext1=request.getParameter("ext1");
	String ext2=request.getParameter("ext2");
	String extTL=request.getParameter("extTL");//通联商户拓展业务字段，在v2.2.0版本之后才使用到的，用于开通分账等业务
	String issuerId=request.getParameter("issuerId");
	String pan=request.getParameter("pan");
	String tradeNature = request.getParameter("tradeNature");
	String sign="";
	
	//若直连telpshx渠道，payerTelephone、payerName、payerIDCard、pan四个字段不可为空
	//其中payerIDCard、pan需使用公钥加密（PKCS1格式）后进行Base64编码
	if(null!=payerIDCard&&!"".equals(payerIDCard)){
		try{
			//payerIDCard = SecurityUtil.encryptByPublicKey("C:\\TLCert.cer", payerIDCard);
			payerIDCard = SecurityUtil.encryptByPublicKey("/opt/conf/TLCert.cer", payerIDCard);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	if(null!=pan&&!"".equals(pan)){
		try{
			pan = SecurityUtil.encryptByPublicKey("/opt/conf/TLCert.cer", pan);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	//构造订单请求对象，生成signMsg。
	com.allinpay.ets.client.RequestOrder requestOrder = new com.allinpay.ets.client.RequestOrder();
	if(null!=inputCharset&&!"".equals(inputCharset)){
		requestOrder.setInputCharset(Integer.parseInt(inputCharset));
	}
	requestOrder.setPickupUrl(pickupUrl);
	requestOrder.setReceiveUrl(receiveUrl);
	requestOrder.setVersion(version);
	if(null!=language&&!"".equals(language)){
		requestOrder.setLanguage(Integer.parseInt(language));
	}
	requestOrder.setSignType(Integer.parseInt(signType));
	requestOrder.setPayType(Integer.parseInt(payType));
	requestOrder.setIssuerId(issuerId);
	requestOrder.setMerchantId(merchantId);
	requestOrder.setPayerName(payerName);
	requestOrder.setPayerEmail(payerEmail);
	requestOrder.setPayerTelephone(payerTelephone);
	requestOrder.setPayerIDCard(payerIDCard);
	requestOrder.setPid(pid);
	requestOrder.setOrderNo(orderNo);
	requestOrder.setOrderAmount(Long.parseLong(orderAmount));
	requestOrder.setOrderCurrency(orderCurrency);
	requestOrder.setOrderDatetime(orderDatetime);
	requestOrder.setOrderExpireDatetime(orderExpireDatetime);
	requestOrder.setProductName(productName);
	if(null!=productPrice&&!"".equals(productPrice)){
		requestOrder.setProductPrice(Long.parseLong(productPrice));
	}
	if(null!=productNum&&!"".equals(productNum)){
		requestOrder.setProductNum(Integer.parseInt(productNum));
	}	
	requestOrder.setProductId(productId);
	requestOrder.setProductDesc(productDesc);
	requestOrder.setExt1(ext1);
	requestOrder.setExt2(ext2);
	requestOrder.setExtTL(extTL);//通联商户拓展业务字段，在v2.2.0版本之后才使用到的，用于开通分账等业务
	requestOrder.setPan(pan);
	requestOrder.setTradeNature(tradeNature);
	requestOrder.setKey(key); //key为MD5密钥，密钥是在通联支付网关会员服务网站上设置。

	String strSrcMsg = requestOrder.getSrc(); // 此方法用于debug，测试通过后可注释。
	String strSignMsg = requestOrder.doSign(); // 签名，设为signMsg字段值。
	%>
	
	<!--
		1、订单可以通过post方式或get方式提交，建议使用post方式；
		   提交支付请求可以使用http或https方式，建议使用https方式。
		2、通联支付网关地址、商户号及key值，在接入测试时由通联提供；
		   通联支付网关地址、商户号，在接入生产时由通联提供，key值在通联支付网关会员服务网站上设置。
	-->
	<center>
	<!--================= post 方式提交支付请求 start =====================-->
    <!--================= 测试地址为 http://ceshi.allinpay.com/gateway/index.do =====================-->
	<!--================= 生产地址请在测试环境下通过后从业务人员获取 (https://service.allinpay.com/gateway/index.do )=====================-->
	<form name="form2" action="<%=serverUrl %>" method="post">
		<input type="hidden" name="inputCharset" value="<%=inputCharset%>"/>
		<input type="hidden" name="pickupUrl" value="<%=pickupUrl%>"/>
		<input type="hidden" name="receiveUrl" value="<%=receiveUrl%>" />
		<input type="hidden" name="version" value="<%=version %>"/>
		<input type="hidden" name="language" value="<%=language %>" />
		<input type="hidden" name="signType" value="<%=signType%>"/>
		<input type="hidden" name="merchantId" value="<%=merchantId%>" />
		<input type="hidden" name="payerName" value="<%=payerName%>"/>
		<input type="hidden" name="payerEmail" value="<%=payerEmail%>" />
		<input type="hidden" name="payerTelephone" value="<%=payerTelephone %>" />
		<input type="hidden" name="payerIDCard" value="<%=payerIDCard %>" />
		<input type="hidden" name="pid" value="<%=pid%>"/>
		<input type="hidden" name="orderNo" value="<%=orderNo%>" />
		<input type="hidden" name="orderAmount" value="<%=orderAmount %>"/>
		<input type="hidden" name="orderCurrency" value="<%=orderCurrency%>" />
		<input type="hidden" name="orderDatetime" value="<%=orderDatetime%>" />
		<input type="hidden" name="orderExpireDatetime" value="<%=orderExpireDatetime %>"/>
		<input type="hidden" name="productName" value="<%=productName%>" />
		<input type="hidden" name="productPrice" value="<%=productPrice%>" />
		<input type="hidden" name="productNum" value="<%=productNum %>"/>
		<input type="hidden" name="productId" value="<%=productId%>" />
		<input type="hidden" name="productDesc" value="<%=productDesc%>" />
		<input type="hidden" name="ext1" value="<%=ext1%>" />
		<input type="hidden" name="ext2" value="<%=ext2%>" />
		<input type="hidden" name="payType" value="<%=payType%>" />
		<input type="hidden" name="issuerId" value="<%=issuerId%>" />
		<input type="hidden" name="pan" value="<%=pan %>" />
		<input type="hidden" name="tradeNature" value="<%=tradeNature %>" />
		<input type="hidden" name="signMsg" value="<%=strSignMsg %>" />
		
	    <input type="submit" value="确认付款，到通联支付去啦"/>
	 </form>
	<!--================= post 方式提交支付请求 end =====================-->

	<div>&nbsp;</div>
	<div>组成签名信息的源串: <textarea cols="100" rows="4"><%=strSrcMsg %></textarea></div>
	</center>
	</body>
	</html>
