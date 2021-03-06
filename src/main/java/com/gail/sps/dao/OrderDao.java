package com.gail.sps.dao;

import java.util.List;

import com.gail.sps.model.Order;
import com.gail.sps.model.OrderProduct;

public interface OrderDao extends GenericDao<Order, Integer> {

    void saveOrderProduct(OrderProduct orderProduct) throws Exception;
    
    List<OrderProduct> listOrderProduct(Integer orderId) throws Exception;
    
    List<Order> listOrders(Integer productId, Integer userId) throws Exception;
    
    void updateStatus(Order order) throws Exception;
    
    Order getByNo(String number) throws Exception;
}
