package com.gail.sps.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gail.sps.dao.UserDao;
import com.gail.sps.model.Role;
import com.gail.sps.model.User;
import com.gail.sps.service.UserService;

@Component
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	@Transactional
	@Override
	public void register(User user) throws Exception {
		if (user != null) {
			Role role = new Role(1);
			user.setRole(role);
			user.setStatus(1);
			userDao.save(user);
		}
	}

	@Override
	public User getByUserName(String username) throws Exception {
		return userDao.getByUserName(username);
	}

}
