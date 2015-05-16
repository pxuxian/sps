package com.gail.sps.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gail.sps.dao.GenericDao;
import com.gail.sps.dao.ProductCategoryDao;
import com.gail.sps.model.ProductCategory;
import com.gail.sps.service.ProductCategoryService;

@Component
public class ProductCategoryServiceImpl extends GenericeServiceImpl<ProductCategory, Integer> implements
        ProductCategoryService {

    @Autowired
    private ProductCategoryDao productCategoryDao;

    @Override
    public GenericDao<ProductCategory, Integer> getDao() {
        return this.productCategoryDao;
    }

    @Override
	protected void setDetail(ProductCategory t) {
		// TODO Auto-generated method stub
		
	}

}
