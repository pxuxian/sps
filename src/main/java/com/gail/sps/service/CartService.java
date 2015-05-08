package com.gail.sps.service;

import com.gail.sps.model.Cart;
import com.gail.sps.model.CartItem;

public interface CartService {

    Cart addCartItem(Cart cart, CartItem cartItem) throws Exception;

    Cart modifyCartItem(Cart cart, Integer productId, String op) throws Exception;

}
