package com.gail.sps.action;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import com.gail.sps.model.Product;
import com.gail.sps.model.ProductCategory;
import com.gail.sps.service.ProductCategoryService;
import com.gail.sps.service.ProductService;

@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/")
public class ProductAction extends BaseAction {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductCategoryService productCategoryService;

    private Product p;
    private List<ProductCategory> pcList;

    @Action(value = "detail", results = { @Result(name = "success", location = "/detail.jsp") })
    public String detail() {
        try {
            this.p = productService.getById(id);
            this.pcList = productCategoryService.limitSelect();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    public Product getP() {
        return p;
    }

    public void setP(Product p) {
        this.p = p;
    }

    public List<ProductCategory> getPcList() {
        return pcList;
    }

    public void setPcList(List<ProductCategory> pcList) {
        this.pcList = pcList;
    }

}
