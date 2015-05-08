package com.gail.sps.model;

/**
 * 产品类型
 *
 * @author pxuxian
 */
public class ProductCategory extends BaseModel {
    private static final long serialVersionUID = -7526205348661453960L;

    private int id;
    private String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "ProductCategory [id=" + id + ", name=" + name + "]";
    }

}
