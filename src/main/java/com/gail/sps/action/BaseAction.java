package com.gail.sps.action;

public class BaseAction {
    protected int id;
    protected int page;
    protected int pageSize;
    protected static final int DEFAULTPAGEINDEX = 1;
    protected static final int DEFAULTPAGESIZE = 10;
    protected String msg;
    protected int successType;
    
    protected static final String SUCCESS = "success";
    protected static final String ERROR = "error";
    
    protected static final int SUCCESS_TYPE_SUBMIT_ORDER = 1; // 订单提交成功

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

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public int getSuccessType() {
		return successType;
	}

	public void setSuccessType(int successType) {
		this.successType = successType;
	}

}
