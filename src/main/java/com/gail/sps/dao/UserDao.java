package com.gail.sps.dao;

import com.gail.sps.model.User;

public interface UserDao extends GenericDao<User, Integer> {

	public User getByUserName(String username) throws Exception;
}
