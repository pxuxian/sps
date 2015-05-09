package com.gail.sps.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gail.sps.dao.GenericDao;
import com.gail.sps.dao.UserDao;
import com.gail.sps.model.Role;
import com.gail.sps.model.User;
import com.gail.sps.service.UserService;
import com.gail.sps.util.PaginatedList;

@Component
public class UserServiceImpl extends GenericeServiceImpl<User, Integer> implements UserService {

	@Autowired
	private UserDao userDao;

	@Override
	public PaginatedList<User> limitSelect() throws Exception {
		return this.limitSelect(new User());
	}

	@Override
	public GenericDao<User, Integer> getDao() {
		return userDao;
	}

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

	@Override
	public String login(User user) throws Exception {
		if (user == null) {
			return "用户名或密码不正确";
		}
		User u = userDao.getLoginUser(user);
		if (u == null) {
			return "用户名或密码不正确";
		}
		return "";
	}

}
