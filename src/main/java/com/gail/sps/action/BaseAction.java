package com.gail.sps.action;

public class BaseAction {
    protected int id;
    protected int page;
    protected int pageSize;
    protected static final int DEFAULTPAGEINDEX = 1;
    protected static final int DEFAULTPAGESIZE = 10;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public static int getDefaultpageindex() {
        return DEFAULTPAGEINDEX;
    }

    public static int getDefaultpagesize() {
        return DEFAULTPAGESIZE;
    }

}
