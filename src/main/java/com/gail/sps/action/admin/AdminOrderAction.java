package com.gail.sps.action.admin;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import com.gail.sps.action.BaseAction;
import com.gail.sps.model.Order;
import com.gail.sps.service.OrderService;

@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/admin/order")
@Result(name = "error", location="/admin/error.jsp")
public class AdminOrderAction extends BaseAction {
	@Autowired
	private OrderService orderService;

	private Order order;
	private List<Order> orderList;

	private void init() {
		if (order == null) {
			order = new Order();
		}
		order.setPage(page == 0 ? DEFAULTPAGEINDEX : page);
		order.setPageSize(pageSize == 0 ? DEFAULTPAGESIZE : pageSize);
	}

	@Action(value = "list", results = { @Result(name = "success", location = "/admin/order/list.jsp") })
	public String list() {
		try {
			this.init();
			this.orderList = orderService.limitSelect(order);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	@Action(value = "detail", results = { @Result(name = "success", location = "/admin/order/detail.jsp") })
	public String detail() {
		try {
			this.order = orderService.getById(id);
		} catch (Exception e) {
			e.printStackTrace();
			return ERROR;
		}
		return SUCCESS;
	}

	@Action(value = "delete", results = { @Result(name = "success", location = "/admin/order/list.jsp") })
	public String delete() {
		try {
			this.init();
			orderService.delete(id);
			this.orderList = orderService.limitSelect(order);
		} catch (Exception e) {
			this.msg = e.getMessage();
			e.printStackTrace();
			return ERROR;
		}
		return SUCCESS;
	}
	
	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public List<Order> getOrderList() {
		return orderList;
	}

	public void setOrderList(List<Order> orderList) {
		this.orderList = orderList;
	}

}
