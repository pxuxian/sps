package com.gail.sps.dao;

import java.util.List;

import com.gail.sps.model.News;

public interface NewsDao extends GenericDao<News, Integer> {

	public List<News> listTopNews() throws Exception;
}
