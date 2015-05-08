package com.gail.sps.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gail.sps.dao.GenericDao;
import com.gail.sps.dao.ProductDao;
import com.gail.sps.model.Product;
import com.gail.sps.service.ProductService;
import com.gail.sps.util.PaginatedList;

@Component
public class ProductServiceImpl extends GenericeServiceImpl<Product, Integer> implements ProductService {

    @Autowired
    private ProductDao productDao;

    @Override
    public GenericDao<Product, Integer> getDao() {
        return this.productDao;
    }

    public PaginatedList<Product> limitSelect() throws Exception {
        return this.limitSelect(new Product());
    }

    @Override
    public void save(Product t) throws Exception {
        t.setStatus(1);
        super.save(t);
    }

}
