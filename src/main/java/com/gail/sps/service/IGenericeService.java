package com.gail.sps.service;

import java.io.Serializable;

import com.gail.sps.model.BaseModel;
import com.gail.sps.util.PaginatedList;

/**
 * 该Service接口提供了基本的CRUD方法，通过实现该接口，就能获取这些接口；
 * 抽象的GenericServiceImpl实现了该接口，通过继承GenericServiceImpl，
 * 子类将自动获取GenericService和GenericServiceImpl的方法
 *
 * @author: xuxianpan
 */
public interface IGenericeService<T extends BaseModel, ID extends Serializable> {

    T getById(ID id) throws Exception;
    
    T getByIdDetail(ID id) throws Exception;

    /**
     * 带分页的查询
     *
     * @param t
     * @return
     * @throws Exception
     */
    PaginatedList<T> limitSelect(T t) throws Exception;
    
    PaginatedList<T> limitSelectDetail(T t) throws Exception;

    PaginatedList<T> limitSelect() throws Exception;

    void save(T t) throws Exception;

    void delete(ID id) throws Exception;

    void update(T t) throws Exception;
}
