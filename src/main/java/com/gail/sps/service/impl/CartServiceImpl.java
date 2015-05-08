package com.gail.sps.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gail.sps.dao.ProductDao;
import com.gail.sps.model.Cart;
import com.gail.sps.model.CartItem;
import com.gail.sps.model.Product;
import com.gail.sps.service.CartService;

@Component
public class CartServiceImpl implements CartService {

    @Autowired
    private ProductDao productDao;

    public Cart addCartItem(Cart cart, CartItem cartItem) throws Exception {
        if (cart == null) {
            cart = new Cart();
        }
        Map<Integer, CartItem> cartItemMap = new HashMap<Integer, CartItem>();
        if (cart.getCartItemList() != null) {
            for (CartItem ct : cart.getCartItemList()) {
                cartItemMap.put(ct.getProductId(), ct);
            }
        }
        int productId = cartItem.getProductId();
        int count = cartItem.getCount();
        if (cartItemMap.containsKey(productId)) {
            count += cartItemMap.get(productId).getCount();
        }
        cartItemMap.put(productId, this.createCartItem(productId, count));

        List<CartItem> cartItemList = new ArrayList<CartItem>();
        for (CartItem ct : cartItemMap.values()) {
            cartItemList.add(ct);
        }
        cart.setCartItemList(cartItemList);
        this.setCountAndTotal(cart);
        return cart;
    }

    public Cart modifyCartItem(Cart cart, Integer productId, String op) throws Exception {
        Map<Integer, CartItem> cartItemMap = new HashMap<Integer, CartItem>();
        if (cart.getCartItemList() != null) {
            for (CartItem ct : cart.getCartItemList()) {
                cartItemMap.put(ct.getProductId(), ct);
            }
        }

        if ("delete".equals(op)) {
            cartItemMap.remove(productId);
        } else if ("add".equals(op)) {
            cartItemMap.put(productId, this.createCartItem(productId, cartItemMap.get(productId).getCount() + 1));
        } else if ("dec".equals(op)) {
            int count = cartItemMap.get(productId).getCount();
            cartItemMap.put(productId, this.createCartItem(productId, count <= 1 ? 1 : count - 1));
        }

        List<CartItem> cartItemList = new ArrayList<CartItem>();
        for (CartItem ct : cartItemMap.values()) {
            cartItemList.add(ct);
        }
        cart.setCartItemList(cartItemList);
        this.setCountAndTotal(cart);
        return cart;
    }

    private CartItem createCartItem(Integer productId, int count) throws Exception {
        CartItem cartItem = new CartItem();
        Product product = productDao.getById(productId);
        cartItem.setProductId(productId);
        cartItem.setProduct(product);
        cartItem.setCount(count);
        cartItem.setSubtotal(product.getPrice() * count);
        return cartItem;
    }

    public void setCountAndTotal(Cart cart) throws Exception {
        double total = 0;
        int count = 0;
        if (cart.getCartItemList() != null) {
            for (CartItem c : cart.getCartItemList()) {
                total += c.getSubtotal();
                count += c.getCount();
            }
        }
        cart.setCount(count);
        cart.setTotal(total);
    }

}
