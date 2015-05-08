package com.gail.sps.model;

import java.util.List;

/**
 * 购物车
 *
 * @author pxuxian
 */
public class Cart extends BaseModel {
    private static final long serialVersionUID = 6333029704236724005L;

    List<CartItem> cartItemList;
    private int count;
    private double total;

    public List<CartItem> getCartItemList() {
        return cartItemList;
    }

    public void setCartItemList(List<CartItem> cartItemList) {
        this.cartItemList = cartItemList;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

}
