package com.gail.sps.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.gail.sps.constant.OrderStatus;
import com.gail.sps.dao.CommentDao;
import com.gail.sps.dao.GenericDao;
import com.gail.sps.dao.UserDao;
import com.gail.sps.model.Comment;
import com.gail.sps.model.Order;
import com.gail.sps.service.CommentService;
import com.gail.sps.service.OrderService;

@Component
@Transactional
public class CommentServiceImpl extends GenericeServiceImpl<Comment, Integer> implements CommentService {

	@Autowired
	private CommentDao commentDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private OrderService orderService;

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

	@Override
	public void addComment(Comment comment) throws Exception {
		// 查询用户是否订购过这个产品，如果没有，不能评论
		List<Order> orderList = orderService.listOrders(comment.getProductId(), comment.getUserId());
		if (orderList == null || orderList.size() == 0) {
			 throw new Exception("您没有购买过此产品，不能评论！");
		}
		boolean flag = false;
		for (Order order : orderList) {
			if (order.getStatus() == OrderStatus.COMPLETE) {
				flag = true;
				break;
			}
		}
		if (!flag) {
			throw new Exception("您没有购买过此产品，不能评论！");
		}
		this.save(comment);
	}

}
