package com.gail.sps.model;

import java.io.Serializable;

/**
 * 基础Model,其它model继承此model
 *
 * @author xuxianpan
 */
public class BaseModel implements Serializable {
    private static final long serialVersionUID = 1146828794233342776L;

    public static final int STATUS_OK = 0;
    public static final int STATUS_DELETE = 2;

    /**
     * 分页：当前页
     */
    private Integer page = 1;
    /**
     * 分页：记录开始位置
     */
    private Integer startPos;
    /**
     * 分页：页面大小
     */
    private Integer pageSize = 10;

    public Integer getStartPos() {
        return startPos;
    }

    public void setStartPos(Integer startPos) {
        this.startPos = startPos;
    }

    public Integer getPage() {
        return page;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

}
