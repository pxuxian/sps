package com.gail.sps.service;

import java.util.List;

import com.gail.sps.model.Comment;

public interface CommentService extends IGenericeService<Comment, Integer> {

	public List<Comment> queryByProductId(Integer productId) throws Exception;
	
	public void addComment(Comment comment) throws Exception;
}
