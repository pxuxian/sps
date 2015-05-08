package com.gail.sps.dao;

import java.io.Serializable;
import java.util.List;

import com.gail.sps.model.BaseModel;

public interface GenericDao<T extends BaseModel, ID extends Serializable> {

    T getById(ID id) throws Exception;

    List<T> limitSelect(T t) throws Exception;

    int count(T t) throws Exception;

    void save(T t) throws Exception;

    void delete(ID id) throws Exception;

    void update(T t) throws Exception;
}
