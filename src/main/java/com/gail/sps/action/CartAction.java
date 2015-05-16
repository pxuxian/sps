package com.gail.sps.action;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import com.gail.sps.model.Cart;
import com.gail.sps.model.CartItem;
import com.gail.sps.model.ProductCategory;
import com.gail.sps.service.CartService;
import com.gail.sps.service.ProductCategoryService;
import com.opensymphony.xwork2.ActionContext;

@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/")
@Result(name = "error", location="/error.jsp")
public class CartAction extends BaseAction {
    @Autowired
    private ProductCategoryService productCategoryService;
    @Autowired
    private CartService cartService;

    @SuppressWarnings("rawtypes")
    private Map session = ActionContext.getContext().getSession();
    HttpServletRequest request = ServletActionContext.getRequest();
    HttpServletResponse response = ServletActionContext.getResponse();

    private CartItem cartItem;
    private String op; // 修改购物车：add, dec, delete, modify
    private Cart cart;
    private List<ProductCategory> pcList;

    private void init() throws Exception {
        this.pcList = productCategoryService.limitSelect(new ProductCategory());
    }

    @Action(value = "showCart", results = { @Result(name = "success", location = "/cart.jsp") })
    public String showCart() {
        try {
            this.init();
            Object sessionCart = session.get("sessionCart");
            if (sessionCart == null) {
                this.cart = new Cart();
            } else {
                this.cart = (Cart) sessionCart;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return SUCCESS;
    }

    @SuppressWarnings({ "unchecked" })
    @Action(value = "addCart", results = { @Result(name = "success", location = "/cart.jsp") })
    public String addCart() {
        try {
            this.init();
            Object sessionCart = session.get("sessionCart");
            if (sessionCart == null) {
                this.cart = new Cart();
            } else {
                this.cart = (Cart) sessionCart;
            }
            this.cart = cartService.addCartItem(cart, cartItem);
            session.put("sessionCart", this.cart);
        } catch (Exception e) {
        	this.msg = e.getMessage();
            e.printStackTrace();
            return ERROR;
        }
        return SUCCESS;
    }

    @SuppressWarnings("unchecked")
    @Action(value = "modifyCart", results = { @Result(name = "success", location = "/cart.jsp") })
    public String modifyCart() {
        try {
            this.init();
            Object sessionCart = session.get("sessionCart");
            if (sessionCart == null) {
                this.cart = new Cart();
            } else {
                this.cart = (Cart) sessionCart;
            }
            this.cart = cartService.modifyCartItem(cart, id, op);
            session.put("sessionCart", cart);
        } catch (Exception e) {
        	this.msg = e.getMessage();
            e.printStackTrace();
            return ERROR;
        }
        return SUCCESS;
    }

    public CartItem getCartItem() {
        return cartItem;
    }

    public void setCartItem(CartItem cartItem) {
        this.cartItem = cartItem;
    }

    public String getOp() {
        return op;
    }

    public void setOp(String op) {
        this.op = op;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public List<ProductCategory> getPcList() {
        return pcList;
    }

    public void setPcList(List<ProductCategory> pcList) {
        this.pcList = pcList;
    }

}
