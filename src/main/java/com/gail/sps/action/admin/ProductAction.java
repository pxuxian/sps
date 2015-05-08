package com.gail.sps.action.admin;

import java.io.File;
import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import com.gail.sps.action.BaseAction;
import com.gail.sps.model.Product;
import com.gail.sps.model.ProductCategory;
import com.gail.sps.service.ProductCategoryService;
import com.gail.sps.service.ProductService;
import com.gail.sps.util.FileUtil;

@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/admin/product")
public class ProductAction extends BaseAction {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductCategoryService productCategoryService;

    private Product p;
    private List<Product> productList;
    private List<ProductCategory> pcList;
    private static final String logoPath = "/upload/img/product/logo/";

    private File logoFile; // 文件
    private String logoFileFileName; // 文件名

    private void init() {
        if (p == null) {
            p = new Product();
        }
        p.setPage(page == 0 ? DEFAULTPAGEINDEX : page);
        p.setPageSize(pageSize == 0 ? DEFAULTPAGESIZE : pageSize);
    }

    @Action(value = "index", results = { @Result(name = "success", location = "/index1.jsp") })
    public String index() {
        try {
            this.productList = productService.limitSelect(p);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    @Action(value = "list", results = { @Result(name = "success", location = "/admin/product/list.jsp") })
    public String list() {
        try {
            this.init();
            this.productList = productService.limitSelect(p);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    @Action(value = "toAdd", results = { @Result(name = "success", location = "/admin/product/add.jsp") })
    public String toAdd() {
        try {
            this.pcList = productCategoryService.limitSelect();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    @Action(value = "add", results = { @Result(name = "success", location = "/admin/product/list.jsp") })
    public String add() {
        try {
            if (logoFile != null) {
                String uploadPath = ServletActionContext.getServletContext().getRealPath(logoPath); // 设置保存目录
                String fileName = System.currentTimeMillis() + "." + logoFileFileName.split("\\.")[1];
                FileUtil.upload(logoFile, uploadPath, fileName);
                p.setLogo(fileName);
            }
            productService.save(p);
            this.p = new Product();
            this.productList = productService.limitSelect();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    @Action(value = "toModify", results = { @Result(name = "success", location = "/admin/product/edit.jsp") })
    public String toModify() {
        try {
            this.p = productService.getById(this.p.getId());
            this.pcList = productCategoryService.limitSelect();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    @Action(value = "update", results = { @Result(name = "success", location = "/admin/product/list.jsp") })
    public String modify() {
        try {
            if (logoFile != null) {
                String uploadPath = ServletActionContext.getServletContext().getRealPath(logoPath); // 设置保存目录
                String fileName = System.currentTimeMillis() + "." + logoFileFileName.split("\\.")[1];
                FileUtil.upload(logoFile, uploadPath, fileName);
                p.setLogo(fileName);
            }
            productService.update(p);
            this.p = new Product();
            this.productList = productService.limitSelect();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "success";
    }

    @Action(value = "delete", results = { @Result(name = "success", location = "/admin/product/list.jsp") })
    public String delete() {
        try {
            productService.delete(p.getId());
            this.p = new Product();
            this.productList = productService.limitSelect();
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

    public List<Product> getProductList() {
        return productList;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }

    public List<ProductCategory> getPcList() {
        return pcList;
    }

    public void setPcList(List<ProductCategory> pcList) {
        this.pcList = pcList;
    }

    public File getLogoFile() {
        return logoFile;
    }

    public void setLogoFile(File logoFile) {
        this.logoFile = logoFile;
    }

    public String getLogoFileFileName() {
        return logoFileFileName;
    }

    public void setLogoFileFileName(String logoFileFileName) {
        this.logoFileFileName = logoFileFileName;
    }

}
