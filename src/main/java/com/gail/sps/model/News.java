package com.gail.sps.model;

import java.util.Date;

/**
 * 新闻
 * 
 */
public class News extends BaseModel {
	private static final long serialVersionUID = -4551048433932434655L;

	private Integer id;
	private String title;
	private String content;
	private Date createTime;
	private int status;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

}
