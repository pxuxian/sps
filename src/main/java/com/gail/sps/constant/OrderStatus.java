package com.gail.sps.constant;

import java.util.HashMap;
import java.util.Map;

public class OrderStatus {

	public static final Integer NEW = 0;
	public static final Integer PAYED = 1;
	
	private static final Map<Integer, String> orderStatusMap = new HashMap<Integer, String>();
	static {
		orderStatusMap.put(NEW, "等待付款");
		orderStatusMap.put(NEW, "已付款，待发货");
	}
	
	public static String getString(Integer status) {
		return orderStatusMap.get(status);
	}
	
}
