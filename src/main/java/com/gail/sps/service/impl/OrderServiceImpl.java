package com.gail.sps.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gail.sps.constant.OrderStatus;
import com.gail.sps.dao.GenericDao;
import com.gail.sps.dao.OrderDao;
import com.gail.sps.dao.ProductDao;
import com.gail.sps.model.Cart;
import com.gail.sps.model.CartItem;
import com.gail.sps.model.Order;
import com.gail.sps.model.OrderProduct;
import com.gail.sps.model.User;
import com.gail.sps.service.OrderService;
import com.gail.sps.util.PaginatedList;

@Component
@Transactional
public class OrderServiceImpl extends GenericeServiceImpl<Order, Integer> implements OrderService {

	@Autowired
	private OrderDao orderDao;
	@Autowired
	private ProductDao productDao;

	@Override
	public GenericDao<Order, Integer> getDao() {
		return orderDao;
	}

	@Override
	public PaginatedList<Order> limitSelect(Order t) throws Exception {
		List<Order> orderList = super.limitSelect(t);
		if (orderList != null) {
			for (Order order : orderList) {
				order.setStatusStr(OrderStatus.getString(order.getStatus()));
			}
		}
		return (PaginatedList<Order>) orderList;
	}

	@Override
	public Order generaterOrder(Cart cart) throws Exception {
		Order order = new Order();
		if (cart == null) {
			throw new Exception("购物车为空，不能提交订单");
		}
		List<OrderProduct> orderProducts = new ArrayList<OrderProduct>();
		List<CartItem> cartItemList = cart.getCartItemList();
		if (cartItemList == null || cartItemList.size() == 0) {
			throw new Exception("购物车为空，不能提交订单");
		}
		for (CartItem ci : cartItemList) {
			orderProducts.add(new OrderProduct(order, ci.getProduct(), ci.getProduct().getPrice(), ci.getCount(), ci
					.getSubtotal()));
		}
		order.setOrderProducts(orderProducts);
		order.setPostage(0);
		order.setDiscount(0);
		order.setAmount(cart.getTotal());
		if (cart != null) {
			order.setTotal(cart.getTotal() + order.getPostage() - order.getDiscount());
		}
		return order;
	}

	@Override
	@Transactional
	public void submit(Order order, Cart cart) throws Exception {
		Order od = this.generaterOrder(cart);
		order.setNumber(System.currentTimeMillis() + "");
		order.setCreateTime(new Date());
		orderDao.save(order);
		List<OrderProduct> orderProducts = od.getOrderProducts();
		for (OrderProduct orderProduct : orderProducts) {
			orderProduct.setOrder(order);
			orderDao.saveOrderProduct(orderProduct);
		}
	}

	@Override
	public PaginatedList<Order> limitSelect() throws Exception {
		return this.limitSelect(new Order());
	}

	@Override
	public List<Order> listByUser(User user) throws Exception {
		if (user != null) {
			Order order = new Order();
			order.setUser(user);
			List<Order> orderList = this.limitSelect(order);
			for (Order od : orderList) {
				List<OrderProduct> orderProducts = orderDao.listOrderProduct(od.getId());
				if (orderProducts != null) {
					for (OrderProduct op : orderProducts) {
						op.setProduct(productDao.getById(op.getProductId()));
					}
					od.setOrderProducts(orderProducts);
					od.setCount(orderProducts.size());
				}
				od.setStatusStr(OrderStatus.getString(od.getStatus()));
			}
			return orderList;
		}
		return null;
	}

	@Override
	public String cancel(Integer id) throws Exception {
		Order order = this.getById(id);
		if (order == null) {
			return "取消订单出错，此订单不存在";
		}
		order.setStatus(OrderStatus.CANCEL);
		orderDao.updateStatus(order);
		return "";
	}

}
