package com.gail.sps.service;

import java.util.List;

import com.gail.sps.model.Cart;
import com.gail.sps.model.Order;
import com.gail.sps.model.User;

public interface OrderService extends IGenericeService<Order, Integer> {

    public Order generaterOrder(Cart cart) throws Exception;

    public void submit(Order order, Cart cart) throws Exception;
    
    public List<Order> listByUser(User user) throws Exception;
    
    public List<Order> listOrders(Integer productId, Integer userId) throws Exception;
    
    public String cancel(Integer id) throws Exception;
    
    public void paySuccess(String orderNo) throws Exception;
    
}
