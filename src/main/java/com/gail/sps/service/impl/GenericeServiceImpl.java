package com.gail.sps.service.impl;

import java.io.Serializable;
import java.util.List;

import com.gail.sps.dao.GenericDao;
import com.gail.sps.model.BaseModel;
import com.gail.sps.service.IGenericeService;
import com.gail.sps.util.PaginatedArrayList;
import com.gail.sps.util.PaginatedList;

/**
 * 基础Service接口的抽象实现类
 *
 * @author: xuxianpan
 */
public abstract class GenericeServiceImpl<T extends BaseModel, ID extends Serializable> implements
        IGenericeService<T, ID> {
    /**
     * 抽象getDao()方法，实现此方法时提供DAO
     *
     * @return
     */
    public abstract GenericDao<T, ID> getDao();

    public T getById(ID id) throws Exception {
        return this.getDao().getById(id);
    }

    public PaginatedList<T> limitSelect(T t) throws Exception {
        int total = this.getDao().count(t);
        PaginatedList<T> resultList = new PaginatedArrayList<T>(total, t.getPage(), t.getPageSize());
        t.setStartPos(resultList.getStartPos());
        List<T> queryResultList = this.getDao().limitSelect(t);
        resultList.addAll(queryResultList);
        return resultList;
    }

    public void save(T t) throws Exception {
        this.getDao().save(t);
    }

    public void delete(ID id) throws Exception {
        this.getDao().delete(id);
    }

    public void update(T t) throws Exception {
        this.getDao().update(t);
    }

}
