package com.gail.sps.constant;

import java.util.HashMap;
import java.util.Map;

public class OrderStatus {

	public static final Integer NEW = 0;
	public static final Integer CANCEL = 1;
	public static final Integer PAYED = 2;
	public static final Integer DELIVERED = 3;
	public static final Integer COMPLETE = 4;
	
	private static final Map<Integer, String> orderStatusMap = new HashMap<Integer, String>();
	static {
		orderStatusMap.put(NEW, "等待付款");
		orderStatusMap.put(CANCEL, "订单已取消");
		orderStatusMap.put(PAYED, "已付款，待发货");
		orderStatusMap.put(DELIVERED, "已发货");
		orderStatusMap.put(COMPLETE, "已完成");
	}
	
	public static String getString(Integer status) {
		return orderStatusMap.get(status);
	}
	
}
