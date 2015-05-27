package com.gail.sps.action.admin;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import com.gail.sps.action.BaseAction;
import com.gail.sps.model.BaseModel;
import com.gail.sps.model.News;
import com.gail.sps.service.NewsService;

@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/admin/news")
public class NewsAction extends BaseAction {
	@Autowired
	private NewsService newsService;

	private News news;
	private List<News> newsList;

	private void init() {
		if (news == null) {
			news = new News();
		}
		news.setPage(page == 0 ? DEFAULTPAGEINDEX : page);
		news.setPageSize(pageSize == 0 ? DEFAULTPAGESIZE : pageSize);
	}
	
	@Action(value = "list", results = { @Result(name = "success", location = "/admin/news/list.jsp") })
	public String list() {
		try {
			this.init();
			this.newsList = newsService.limitSelect(news);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "success";
	}

	@Action(value = "add", results = { @Result(name = "success", location = "/admin/news/list.jsp") })
	public String add() {
		try {
			news.setStatus(BaseModel.STATUS_OK);
			newsService.save(news);
			this.news = new News();
			this.newsList = newsService.limitSelect(news);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "success";
	}

	@Action(value = "toModify", results = { @Result(name = "success", location = "/admin/news/edit.jsp") })
	public String toModify() {
		try {
			this.news = newsService.getById(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "success";
	}

	@Action(value = "update", results = { @Result(name = "success", location = "/admin/news/list.jsp") })
	public String modify() {
		try {
			newsService.update(news);
			this.news = new News();
			this.newsList = newsService.limitSelect(news);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "success";
	}

	@Action(value = "delete", results = { @Result(name = "success", location = "/admin/news/list.jsp") })
	public String delete() {
		try {
			newsService.delete(id);
			this.news = new News();
			this.newsList = newsService.limitSelect(news);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "success";
	}

	public News getNews() {
		return news;
	}

	public void setNews(News news) {
		this.news = news;
	}

	public List<News> getNewsList() {
		return newsList;
	}

	public void setNewsList(List<News> newsList) {
		this.newsList = newsList;
	}

}
