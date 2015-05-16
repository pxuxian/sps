package com.gail.sps.dao;

import java.util.List;

import com.gail.sps.model.Comment;

public interface CommentDao extends GenericDao<Comment, Integer> {

	public List<Comment> queryByProductId(Integer productId) throws Exception;

}
