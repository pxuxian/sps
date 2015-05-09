package com.gail.sps.dao;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.gail.sps.model.Order;
import com.gail.sps.model.OrderProduct;
import com.gail.sps.model.Product;
import com.gail.sps.service.OrderService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
public class OrderDaoTest {

    @Autowired
    private OrderDao orderDao;
    @Autowired
    private OrderService orderService;
    @Autowired
    private ProductDao productDao;

//    @Test
    public void save() throws Exception {
        List<OrderProduct> orderProductList = new ArrayList<OrderProduct>();
        Product p = productDao.getById(1);
        p.setId(1);
        Order order = new Order();
        order.setReceiver("盘许先");
        order.setAddress("aaa");
        order.setAmount(4);
        order.setPostage(10);
        order.setDiscount(0);
        order.setTotal(100);
        orderDao.save(order);
        orderProductList.add(new OrderProduct(order, p, 123, 1, 123));
        for (OrderProduct orderProduct : orderProductList) {
            orderDao.saveOrderProduct(orderProduct);
        }
    }
    @Test
    public void list() throws Exception {
    	Order order = new Order();
    	order.setPage(1);
    	order.setPageSize(10);
    	List<Order> orderList = orderService.limitSelect();
    }

}
