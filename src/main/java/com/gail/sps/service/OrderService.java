package com.gail.sps.service;

import com.gail.sps.model.Cart;
import com.gail.sps.model.Order;

public interface OrderService {

    Order generaterOrder(Cart cart) throws Exception;

    void submit(Order order, Cart cart) throws Exception;
}
