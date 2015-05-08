package com.gail.sps.util;

import java.util.List;

/**
 * 分页接口
 *
 * @author xuxianpan
 * @param <E>
 */
public interface PaginatedList<V> extends List<V> {

    /**
     * 取得每页的记录数
     *
     * @return 每页记录数
     */
    int getPageSize();

    /**
     * 取得共有多少页
     *
     * @return 总页数
     */
    int getTotalPage();

    /**
     * 取得总记录数
     *
     * @return 总记录数
     */
    int getTotalRec();

    /**
     * 取得当前页
     *
     * @return 当前页
     */
    int getPageIndex();

    /**
     * 符合记录范围的开始位置
     *
     * @return 位置
     */
    int getStartPos();

    /**
     * 符合记录范围的结束位置
     *
     * @return 结束位置
     */
    int getEndPos();

    /**
     * @return 页面显示页的第一页
     */
    int getBegin();

    /**
     * @return 页面显示页的最后一页
     */
    int getEnd();

    /**
     * 默认页大小
     */
    int DEFAULT_PAGE_SIZE = 10;

    /**
     * 每个页面只显示5 例如 1 2 3 4 5
     */
    int DEFAULT_DISPALY_PAGE_COUNT = 5;

}
