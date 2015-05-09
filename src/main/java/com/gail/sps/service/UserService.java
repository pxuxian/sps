package com.gail.sps.service;

import com.gail.sps.model.User;

public interface UserService extends IGenericeService<User, Integer> {

	User getByUserName(String username) throws Exception;

	void register(User user) throws Exception;
	
	String login(User user) throws Exception;

}
