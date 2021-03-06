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
public class IndexAction extends BaseAction {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductCategoryService productCategoryService;

    private List<Product> productList1;
    private List<Product> productList2;
    private List<ProductCategory> pcList;
    private List<Product> hotProductList;
    private String cid;
    
    @Action(value = "/index", results = { @Result(name = "success", location = "/index1.jsp") })
    public String list() {
        try {
            Product p = new Product();
            p.setPageSize(16);
            p.setSectionId(1);
            if (cid != null) {
            	String[] param = cid.split(",");
            	if (param.length == 2) {
            		p.setCategoryId(Integer.valueOf(param[1].trim()));
            	}
            }
            this.productList1 = productService.limitSelect(p);
//            p.setPageSize(8);
//            p.setSectionId(2);
//            this.productList2 = productService.limitSelect(p);
            this.pcList = productCategoryService.limitSelect(new ProductCategory());
            this.hotProductList = productService.listHotProducts();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return SUCCESS;
    }

    public List<Product> getProductList1() {
        return productList1;
    }

    public void setProductList1(List<Product> productList1) {
        this.productList1 = productList1;
    }

    public List<Product> getProductList2() {
        return productList2;
    }

    public void setProductList2(List<Product> productList2) {
        this.productList2 = productList2;
    }

    public List<ProductCategory> getPcList() {
        return pcList;
    }

    public void setPcList(List<ProductCategory> pcList) {
        this.pcList = pcList;
    }

	public List<Product> getHotProductList() {
		return hotProductList;
	}

	public void setHotProductList(List<Product> hotProductList) {
		this.hotProductList = hotProductList;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

}
