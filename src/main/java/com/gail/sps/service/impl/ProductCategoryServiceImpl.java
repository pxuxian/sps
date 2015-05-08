package com.gail.sps.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gail.sps.dao.GenericDao;
import com.gail.sps.dao.ProductCategoryDao;
import com.gail.sps.model.ProductCategory;
import com.gail.sps.service.ProductCategoryService;
import com.gail.sps.util.PaginatedList;

@Component
public class ProductCategoryServiceImpl extends GenericeServiceImpl<ProductCategory, Integer> implements
        ProductCategoryService {

    @Autowired
    private ProductCategoryDao productCategoryDao;

    @Override
    public GenericDao<ProductCategory, Integer> getDao() {
        return this.productCategoryDao;
    }

    public PaginatedList<ProductCategory> limitSelect() throws Exception {
        return this.limitSelect(new ProductCategory());
    }

}
