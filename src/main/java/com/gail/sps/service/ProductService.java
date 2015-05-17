package com.gail.sps.service;

import java.util.List;

import com.gail.sps.model.Product;

public interface ProductService extends IGenericeService<Product, Integer> {

	public List<Product> listHotProducts() throws Exception;

}
