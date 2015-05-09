package com.gail.sps.dao;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.gail.sps.model.User;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext.xml" })
public class UserDaoTest {

	@Autowired
	private UserDao userDao;
	
	@Test
	public void list() {
		try {
			
			List<User> userList = userDao.select(new User());
			System.out.println(userList);
			User user = userDao.getByUserName("aaa");
			System.out.println(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
