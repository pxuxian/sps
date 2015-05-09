package com.gail.sps.service;

import com.gail.sps.model.User;

public interface UserService {

	User getByUserName(String username) throws Exception;

	void register(User user) throws Exception;

}
