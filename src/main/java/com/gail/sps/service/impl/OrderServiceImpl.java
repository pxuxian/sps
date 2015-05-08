package com.gail.sps.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gail.sps.dao.OrderDao;
import com.gail.sps.model.Cart;
import com.gail.sps.model.CartItem;
import com.gail.sps.model.Order;
import com.gail.sps.model.OrderProduct;
import com.gail.sps.service.OrderService;

@Component
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;

    public Order generaterOrder(Cart cart) throws Exception {
        Order order = new Order();
        if (cart == null) {
            return order;
        }
        List<OrderProduct> orderProducts = new ArrayList<OrderProduct>();
        List<CartItem> cartItemList = cart.getCartItemList();
        if (cartItemList != null) {
            for (CartItem ci : cartItemList) {
                orderProducts.add(new OrderProduct(order, ci.getProduct(), ci.getProduct().getPrice(), ci.getCount(),
                        ci.getSubtotal()));
            }
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

    @Transactional
    public void submit(Order order, Cart cart) throws Exception {
        Order od = this.generaterOrder(cart);
        orderDao.save(order);
        List<OrderProduct> orderProducts = od.getOrderProducts();
        for (OrderProduct orderProduct : orderProducts) {
            orderProduct.setOrder(order);
            orderDao.saveOrderProduct(orderProduct);
        }
    }

}
