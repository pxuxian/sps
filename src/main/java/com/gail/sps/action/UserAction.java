package com.gail.sps.action;

import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import com.gail.sps.model.ProductCategory;
import com.gail.sps.model.User;
import com.gail.sps.service.ProductCategoryService;
import com.gail.sps.service.UserService;
import com.opensymphony.xwork2.ActionContext;

@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/")
@Result(name = "error", location = "/error.jsp")
public class UserAction extends BaseAction {
	@Autowired
	private ProductCategoryService productCategoryService;
	@Autowired
	private UserService userService;

	@SuppressWarnings("rawtypes")
	private Map session = ActionContext.getContext().getSession();
	HttpServletResponse response = ServletActionContext.getResponse();

	private User user;
	private List<ProductCategory> pcList;
	private String msg;

	private void init() throws Exception {
		this.pcList = productCategoryService.limitSelect();
	}

	@SuppressWarnings("unchecked")
	@Action(value = "reg", results = { @Result(name = "success", location = "/success.jsp") })
	public String reg() {
		try {
			this.init();
			userService.register(user);
			session.put("sessionUser", user);
			this.msg = "注册成功";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
		return "success";
	}

	@Action(value = "ajax_reg")
	public void ajaxReg() {
		try {
			response.setContentType("text/html;charset=UTF-8");
			response.setHeader("Cache-Control", "no-cache");
			PrintWriter out = response.getWriter();
			User u = userService.getByUserName(user.getUsername());
			if (u != null) {
				out.write("1");
			} else {
				out.write("0");
			}
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<ProductCategory> getPcList() {
		return pcList;
	}

	public void setPcList(List<ProductCategory> pcList) {
		this.pcList = pcList;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
