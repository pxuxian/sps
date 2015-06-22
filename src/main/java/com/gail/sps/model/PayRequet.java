package com.gail.sps.model;


public class PayRequet extends BaseModel {
	private static final long serialVersionUID = 9061369232117076719L;

	private String serverUrl;
	private String key = "1234567890";
	private String version = "v1.0";
	private String language = "1";
	private String inputCharset = "1";
	private String merchantId = "100020091218001"; // 商户号
	private String pickupUrl;
	private String receiveUrl;
	private String payType = "0";
	private String signType = "1";
	private String orderNo;
	private String orderAmount;
	private String orderDatetime;
	private String orderCurrency = "0";
	// private String orderExpireDatetime = request.getParameter("orderExpireDatetime");
	// private String payerTelephone = request.getParameter("payerTelephone");
	// private String payerEmail = request.getParameter("payerEmail");
	// private String payerName = request.getParameter("payerName");
	// private String payerIDCard = request.getParameter("payerIDCard");
	// private String pid = request.getParameter("pid");
	// private String productName = request.getParameter("productName");
	// private String productId = request.getParameter("productId");
	private String productNum = "1";
	// private String productPrice = request.getParameter("productPrice");
	// private String productDesc = request.getParameter("productDesc");
	// private String ext1 = request.getParameter("ext1");
	// private String ext2 = request.getParameter("ext2");
	// private String extTL = request.getParameter("extTL");//
	// 通联商户拓展业务字段，在v2.2.0版本之后才使用到的，用于开通分账等业务
	// private String issuerId = request.getParameter("issuerId");
	// private String pan = request.getParameter("pan");
	// private String tradeNature = request.getParameter("tradeNature");
	private String sign = "";

	public String getServerUrl() {
		return serverUrl;
	}

	public void setServerUrl(String serverUrl) {
		this.serverUrl = serverUrl;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getInputCharset() {
		return inputCharset;
	}

	public void setInputCharset(String inputCharset) {
		this.inputCharset = inputCharset;
	}

	public String getMerchantId() {
		return merchantId;
	}

	public void setMerchantId(String merchantId) {
		this.merchantId = merchantId;
	}

	public String getPickupUrl() {
		return pickupUrl;
	}

	public void setPickupUrl(String pickupUrl) {
		this.pickupUrl = pickupUrl;
	}

	public String getReceiveUrl() {
		return receiveUrl;
	}

	public void setReceiveUrl(String receiveUrl) {
		this.receiveUrl = receiveUrl;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

	public String getSignType() {
		return signType;
	}

	public void setSignType(String signType) {
		this.signType = signType;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getOrderAmount() {
		return orderAmount;
	}

	public void setOrderAmount(String orderAmount) {
		this.orderAmount = orderAmount;
	}

	public String getOrderDatetime() {
		return orderDatetime;
	}

	public void setOrderDatetime(String orderDatetime) {
		this.orderDatetime = orderDatetime;
	}

	public String getOrderCurrency() {
		return orderCurrency;
	}

	public void setOrderCurrency(String orderCurrency) {
		this.orderCurrency = orderCurrency;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getProductNum() {
		return productNum;
	}

	public void setProductNum(String productNum) {
		this.productNum = productNum;
	}

}
