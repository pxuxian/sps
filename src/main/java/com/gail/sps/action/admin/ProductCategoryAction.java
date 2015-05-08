package com.gail.sps.action.admin;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import com.gail.sps.action.BaseAction;
import com.gail.sps.model.ProductCategory;
import com.gail.sps.service.ProductCategoryService;

@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/admin/category")
public class ProductCategoryAction extends BaseAction {
    @Autowired
    private ProductCategoryService productCategoryService;

    private ProductCategory pc;
    private List<ProductCategory> productCategoryList;

    private void init() {
        if (pc == null) {
            pc = new ProductCategory();
        }
        pc.setPage(page == 0 ? DEFAULTPAGEINDEX : page);
        pc.setPageSize(pageSize == 0 ? DEFAULTPAGESIZE : pageSize);
    }

    @Action(value = "list", results = { @Result(name = "success", location = "/admin/category/list.jsp") })
    public String list() {
        try {
            this.init();
            this.productCategoryList = productCategoryService.limitSelect(pc);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    @Action(value = "add", results = { @Result(name = "success", location = "/admin/category/list.jsp") })
    public String add() {
        try {
            productCategoryService.save(pc);
            this.pc = new ProductCategory();
            this.productCategoryList = productCategoryService.limitSelect(pc);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    @Action(value = "toModify", results = { @Result(name = "success", location = "/admin/category/edit.jsp") })
    public String toModify() {
        try {
            this.pc = productCategoryService.getById(this.pc.getId());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    @Action(value = "update", results = { @Result(name = "success", location = "/admin/category/list.jsp") })
    public String modify() {
        try {
            productCategoryService.update(pc);
            this.pc = new ProductCategory();
            this.productCategoryList = productCategoryService.limitSelect(pc);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    @Action(value = "delete", results = { @Result(name = "success", location = "/admin/category/list.jsp") })
    public String delete() {
        try {
            productCategoryService.delete(pc.getId());;
            this.pc = new ProductCategory();
            this.productCategoryList = productCategoryService.limitSelect(pc);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    public List<ProductCategory> getProductCategoryList() {
        return productCategoryList;
    }

    public void setProductCategoryList(List<ProductCategory> productCategoryList) {
        this.productCategoryList = productCategoryList;
    }

    public ProductCategory getPc() {
        return pc;
    }

    public void setPc(ProductCategory pc) {
        this.pc = pc;
    }

}
