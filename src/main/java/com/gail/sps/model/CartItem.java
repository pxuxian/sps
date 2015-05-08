package com.gail.sps.model;

/**
 * 购物车物品
 *
 * @author pxuxian
 */
public class CartItem extends BaseModel {
    private static final long serialVersionUID = 8948215799421059033L;

    private int productId;
    private Product product;
    private int count;
    private double subtotal;

    public CartItem() {
    }

    public CartItem(int productId, int count) {
        this.productId = productId;
        this.count = count;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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

    @Override
    public String toString() {
        return "CartItem [productId=" + productId + ", product=" + product + ", count=" + count + ", subtotal="
                + subtotal + "]";
    }

}
