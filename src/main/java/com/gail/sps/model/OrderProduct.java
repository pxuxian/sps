package com.gail.sps.model;

/**
 * 订单产品
 *
 * @author pxuxian
 */
public class OrderProduct extends BaseModel {
    private static final long serialVersionUID = -6775341979166243804L;

    private Order order;
    private Product product;
    private double price;
    private int count;
    private double subtotal;

    public OrderProduct() {
    }

    public OrderProduct(Order order, Product product, double price, int count, double subtotal) {
        this.order = order;
        this.product = product;
        this.price = price;
        this.count = count;
        this.subtotal = subtotal;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

}
