package com.gail.sps.util;

import java.security.MessageDigest;

public class Md5Util {
	public static String MD5Encode(String aData) throws SecurityException {
		String resultString = null;
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			resultString = bytes2HexString(md.digest(aData.getBytes("UTF-8")));
		} catch (Exception e) {
			e.printStackTrace();
			throw new SecurityException("MD5运算失败");
		}
		return resultString;
	}

	public static String bytes2HexString(byte[] b) {
		String ret = "";
		for (int i = 0; i < b.length; i++) {
			String hex = Integer.toHexString(b[i] & 0xFF);
			if (hex.length() == 1) {
				hex = '0' + hex;
			}
			ret += hex.toUpperCase();
		}
		return ret;
	}
	
	public static void main(String[] args) {
		System.out.println(MD5Encode("http://ceshi.allinpay.com/gateway/index.do?inputCharset=1&pickupUrl=http://ceshi.allinpay.com/demo/eshop/display-pay-result/display.do&receiveUrl=http://ceshi.allinpay.com/demo/eshop/recv-pay-result/recv.do&version=v1.0&language=1&signType=1&merchantId=100020091218001&payerName=飞龙&payerEmail=feilong@163.com&payerTelephone=13123456789&orderNo=NO20150621114007&orderAmount=200&orderCurrency=0&orderDatetime=20150621114007&orderExpireDatetime=60&productName=火星人&productPrice=9999&productNum=1&productId=Mars man&productDesc=火星人&ext1=123&ext2=123&payType=0&tradeNature=GOODS&key=1234567890"));
	}

}
