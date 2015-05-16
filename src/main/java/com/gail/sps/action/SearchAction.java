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
public class SearchAction extends BaseAction {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductCategoryService productCategoryService;

    private String wd;
    private List<Product> productList;
    private List<ProductCategory> pcList;

    @Action(value = "search", results = { @Result(name = "success", location = "/search_list.jsp") })
    public String search() {
        try {
            Product p = new Product();
            p.setPage(page == 0 ? DEFAULTPAGEINDEX : page);
            p.setPageSize(20);
            p.setName(wd);
            this.productList = productService.limitSelect(p);
            this.pcList = productCategoryService.limitSelect(new ProductCategory());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    public String getWd() {
        return wd;
    }

    public void setWd(String wd) {
        this.wd = wd;
    }

    public List<ProductCategory> getPcList() {
        return pcList;
    }

    public void setPcList(List<ProductCategory> pcList) {
        this.pcList = pcList;
    }

    public List<Product> getProductList() {
        return productList;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }

}
