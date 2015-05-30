package com.gail.sps.action.admin;

import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
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
import com.opensymphony.xwork2.ActionContext;

@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/admin/news")
public class NewsAction extends BaseAction {
	@Autowired
	private NewsService newsService;
	HttpServletResponse response = ServletActionContext.getResponse();
	@SuppressWarnings("rawtypes")
	Map application = ActionContext.getContext().getApplication();

	private News news;
	private List<News> newsList;

	private void init() {
		if (news == null) {
			news = new News();
		}
		news.setPage(page == 0 ? DEFAULTPAGEINDEX : page);
		news.setPageSize(pageSize == 0 ? DEFAULTPAGESIZE : pageSize);
	}

	@Action(value = "/listTopNews")
	public void listTopNews() {
		try {
			response.setContentType("text/html;charset=UTF-8");
			response.setHeader("Cache-Control", "no-cache");
			PrintWriter out = response.getWriter();
			List<News> newsList = newsService.listTopNews();
			if (newsList != null) {
				StringBuffer newsLink = new StringBuffer();
				for (News news : newsList) {
					newsLink.append("<a href='/news.action?id=" + news.getId()
							+ "' style='text-decoration: underline;'><font color='red'>" + news.getTitle() + "</font></a> ");
					newsLink.append("&nbsp;&nbsp;");
				}
				out.write(newsLink.toString());
			}
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Action(value = "/news", results = { @Result(name = "success", location = "/news.jsp") })
	public String news() {
		try {
			this.news = newsService.getById(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "success";
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
