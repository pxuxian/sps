package com.gail.sps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gail.sps.dao.CommentDao;
import com.gail.sps.dao.GenericDao;
import com.gail.sps.dao.UserDao;
import com.gail.sps.model.Comment;
import com.gail.sps.service.CommentService;

@Component
@Transactional
public class CommentServiceImpl extends GenericeServiceImpl<Comment, Integer> implements CommentService {

	@Autowired
	private CommentDao commentDao;
	@Autowired
	private UserDao userDao;

	@Override
	public GenericDao<Comment, Integer> getDao() {
		return commentDao;
	}

	@Override
	protected void setDetail(Comment comment) throws Exception {
		if (comment != null && comment.getUserId() != null) {
			comment.setUser(userDao.getById(comment.getUserId()));
		}
	}

	@Override
	public List<Comment> queryByProductId(Integer productId) throws Exception {
		List<Comment> commentList = commentDao.queryByProductId(productId);
		if (commentList != null) {
			for (Comment comment : commentList) {
				this.setDetail(comment);
			}
		}
		return commentList;
	}

}
