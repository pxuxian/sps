package com.gail.sps.action.admin;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.context.annotation.Scope;

import com.gail.sps.action.BaseAction;

@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/")
@Result(name = "error", location = "/admin/error.jsp")
public class AdminAction extends BaseAction {

	@Action(value = "admin", results = { @Result(name = "success", location = "/admin/index.jsp") })
	public String admin() {
		return SUCCESS;
	}

}
