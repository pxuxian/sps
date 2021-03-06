package com.gail.sps.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gail.sps.dao.GenericDao;
import com.gail.sps.dao.ProductDao;
import com.gail.sps.model.BaseModel;
import com.gail.sps.model.Product;
import com.gail.sps.service.ProductService;

@Component
public class ProductServiceImpl extends GenericeServiceImpl<Product, Integer> implements ProductService {

    @Autowired
    private ProductDao productDao;

    @Override
    public GenericDao<Product, Integer> getDao() {
        return this.productDao;
    }

    @Override
	protected void setDetail(Product t) {
		
	}

	@Override
    public void save(Product t) throws Exception {
        t.setStatus(BaseModel.STATUS_OK);
        super.save(t);
    }

	@Override
	public List<Product> listHotProducts() throws Exception {
		List<Product> productList = new ArrayList<Product>();
		List<Integer> productIds = productDao.listHotProducts();
		if (productIds != null) {
			for (Integer productId : productIds) {
				productList.add(this.getById(productId));
			}
		}
		return productList;
	}
	
}
