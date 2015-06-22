package com.gail.sps.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.allinpay.ets.client.RequestOrder;
import com.gail.sps.model.Order;
import com.gail.sps.model.PayRequet;
import com.gail.sps.service.OrderService;
import com.gail.sps.service.PayService;
import com.gail.sps.util.DateUtil;

@Component
public class PayServiceImpl implements PayService {

	// public static final String PAY_SERVICE = "https://service.allinpay.com/gateway/index.do";
	public static final String PAY_SERVICE = "http://ceshi.allinpay.com/gateway/index.do";
	 public static final String PICKUP_URL = "http://www.jinritegong.com/pay/pickup.jsp";
	// public static final String RECEIVE_URL = "http://www.jinritegong.com/receive.jsp";
//	public static final String PICKUP_URL = "http://127.0.0.1/pay/pickup.jsp";
//	public static final String RECEIVE_URL = "http://127.0.0.1/pay/receive.jsp";

	@Autowired
	private OrderService orderService;

	@Override
	public String getPayUrl(int orderId) throws Exception {
		Order order = orderService.getByIdDetail(orderId);
		RequestOrder requestOrder = this.getRequestOrder(order);
		String strSrcMsg = requestOrder.getSrc(); // 此方法用于debug，测试通过后可注释。
		String strSignMsg = requestOrder.doSign(); // 签名，设为signMsg字段值。
		String url = PAY_SERVICE + "?" + strSrcMsg + "&signMsg=" + strSignMsg;
		return url;
	}

	private RequestOrder getRequestOrder(Order order) {
		PayRequet payRequet = this.getPayRequet(order);
		RequestOrder requestOrder = new RequestOrder();
		if (null != payRequet.getInputCharset() && !"".equals(payRequet.getInputCharset())) {
			requestOrder.setInputCharset(Integer.parseInt(payRequet.getInputCharset()));
		}
		requestOrder.setPickupUrl(payRequet.getPickupUrl());
		requestOrder.setReceiveUrl(payRequet.getReceiveUrl());
		requestOrder.setVersion(payRequet.getVersion());
		if (null != payRequet.getLanguage() && !"".equals(payRequet.getLanguage())) {
			requestOrder.setLanguage(Integer.parseInt(payRequet.getLanguage()));
		}
		requestOrder.setSignType(Integer.parseInt(payRequet.getSignType()));
		requestOrder.setPayType(Integer.parseInt(payRequet.getPayType()));
		// requestOrder.setIssuerId(issuerId);
		requestOrder.setMerchantId(payRequet.getMerchantId());
		// requestOrder.setPayerName(payerName);
		// requestOrder.setPayerEmail(payerEmail);
		// requestOrder.setPayerTelephone(payerTelephone);
		// requestOrder.setPayerIDCard(payerIDCard);
		// requestOrder.setPid(pid);
		requestOrder.setOrderNo(payRequet.getOrderNo());
		requestOrder.setOrderAmount(Long.parseLong(payRequet.getOrderAmount()));
		requestOrder.setOrderCurrency(payRequet.getOrderCurrency());
		requestOrder.setOrderDatetime(payRequet.getOrderDatetime());
		// requestOrder.setOrderExpireDatetime(orderExpireDatetime);
		// requestOrder.setProductName(productName);
		// if (null != productPrice && !"".equals(productPrice)) {
		// requestOrder.setProductPrice(Long.parseLong(productPrice));
		// }
		if (null != payRequet.getProductNum() && !"".equals(payRequet.getProductNum())) {
			requestOrder.setProductNum(Integer.parseInt(payRequet.getProductNum()));
		}
		// requestOrder.setProductId(productId);
		// requestOrder.setProductDesc(productDesc);
		// requestOrder.setExt1(ext1);
		// requestOrder.setExt2(ext2);
		// requestOrder.setExtTL(extTL);// 通联商户拓展业务字段，在v2.2.0版本之后才使用到的，用于开通分账等业务
		// requestOrder.setPan(pan);
		// requestOrder.setTradeNature(tradeNature);
		requestOrder.setKey(payRequet.getKey()); // key为MD5密钥，密钥是在通联支付网关会员服务网站上设置。
		return requestOrder;
	}

	private PayRequet getPayRequet(Order order) {
		// 构造订单请求对象，生成signMsg。
		PayRequet payRequet = new PayRequet();
		payRequet.setServerUrl(PAY_SERVICE);
		payRequet.setPickupUrl(PICKUP_URL);
//		payRequet.setReceiveUrl(RECEIVE_URL);
		payRequet.setOrderNo(order.getNumber());
		payRequet.setProductNum(order.getCount() + "");
		payRequet.setOrderAmount("" + ((int) (order.getAmount() * 100)));
		payRequet.setOrderDatetime(DateUtil.getFormatStr4(order.getCreateTime()));
		return payRequet;
	}

}
