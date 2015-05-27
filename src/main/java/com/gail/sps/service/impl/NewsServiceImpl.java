package com.gail.sps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gail.sps.dao.GenericDao;
import com.gail.sps.dao.NewsDao;
import com.gail.sps.model.News;
import com.gail.sps.service.NewsService;

@Component
public class NewsServiceImpl extends GenericeServiceImpl<News, Integer> implements NewsService {

	@Autowired
	private NewsDao newsDao;

	@Override
	public GenericDao<News, Integer> getDao() {
		return newsDao;
	}

	@Override
	protected void setDetail(News t) {
	}

	@Override
	public List<News> listTopNews() throws Exception {
		return newsDao.listTopNews();
	}

}
