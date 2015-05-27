package com.gail.sps.service;

import java.util.List;

import com.gail.sps.model.News;

public interface NewsService extends IGenericeService<News, Integer> {

	public List<News> listTopNews() throws Exception;
}
