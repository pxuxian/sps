package com.gail.sps.dao;

import java.util.List;

import com.gail.sps.model.Product;

public interface ProductDao extends GenericDao<Product, Integer> {

	public List<Integer> listHotProducts() throws Exception;

}
