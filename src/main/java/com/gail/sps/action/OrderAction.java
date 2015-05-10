package com.gail.sps.action;

import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import com.gail.sps.model.Cart;
import com.gail.sps.model.Order;
import com.gail.sps.model.ProductCategory;
import com.gail.sps.model.User;
import com.gail.sps.service.OrderService;
import com.gail.sps.service.ProductCategoryService;
import com.gail.sps.service.UserService;
import com.opensymphony.xwork2.ActionContext;

@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/")
@Result(name = "error", location = "/error.jsp")
public class OrderAction extends BaseAction {
    @Autowired
    private ProductCategoryService productCategoryService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;

    @SuppressWarnings("rawtypes")
    private Map session = ActionContext.getContext().getSession();
    private Order order;
    private List<ProductCategory> pcList;
    private List<Order> orderList;
    private String msg;

    private void init() throws Exception {
        this.pcList = productCategoryService.limitSelect();
    }

    @SuppressWarnings("unchecked")
    @Action(value = "toOrder", results = { @Result(name = "success", location = "/order.jsp") })
    public String toOrder() {
        try {
            this.init();
            Cart cart = (Cart) session.get("sessionCart");
            this.order = orderService.generaterOrder(cart);
            session.put("sessionOrder", this.order);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    @SuppressWarnings("unchecked")
	@Action(value = "submitOrder", results = { @Result(name = "success", location = "/success.jsp")})
    public String submitOrder() {
        try {
            this.init();
            if (order.getUser() != null) {
            	User u = order.getUser();
            	userService.register(u);
            	session.put("sessionUser", userService.getByUserName(u.getUsername()));
            }
            Cart cart = (Cart) session.get("sessionCart");
            User user = (User) session.get("sessionUser");
            order.setUser(user);
            orderService.submit(order, cart);
            this.msg = "订单提交成功，查看订单并支付";
            
            session.remove("sessionCart");
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
        return "success";
    }

    @Action(value = "myOrder", results = { @Result(name = "success", location = "/orderList.jsp")})
    public String myOrder() {
        try {
            this.init();
            this.orderList = orderService.listByUser((User)session.get("sessionUser"));
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
        return "success";
    }
    
    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public List<ProductCategory> getPcList() {
        return pcList;
    }

    public void setPcList(List<ProductCategory> pcList) {
        this.pcList = pcList;
    }

	public List<Order> getOrderList() {
		return orderList;
	}

	public void setOrderList(List<Order> orderList) {
		this.orderList = orderList;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
