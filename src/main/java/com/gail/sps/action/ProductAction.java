package com.gail.sps.action;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import com.gail.sps.model.Comment;
import com.gail.sps.model.Product;
import com.gail.sps.model.ProductCategory;
import com.gail.sps.service.CommentService;
import com.gail.sps.service.ProductCategoryService;
import com.gail.sps.service.ProductService;

@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/")
public class ProductAction extends BaseAction {
	@Autowired
	private ProductService productService;
	@Autowired
	private ProductCategoryService productCategoryService;
	@Autowired
	private CommentService commentService;

	private Product p;
	private List<ProductCategory> pcList;
	private Comment comment;
	private List<Comment> commentList;

	@Action(value = "detail", results = { @Result(name = "success", location = "/detail.jsp") })
	public String detail() {
		try {
			this.p = productService.getById(id);
			this.pcList = productCategoryService.limitSelect(new ProductCategory());
			this.commentList = commentService.queryByProductId(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	@Action(value = "addComment", results = { @Result(name = "success", location = "/detail.action?id=${id}", type = "redirect") })
	public String addComment() {
		try {
			commentService.save(comment);
			this.p = productService.getById(id);
			this.pcList = productCategoryService.limitSelect(new ProductCategory());
			this.commentList = commentService.queryByProductId(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	public Product getP() {
		return p;
	}

	public void setP(Product p) {
		this.p = p;
	}

	public List<ProductCategory> getPcList() {
		return pcList;
	}

	public void setPcList(List<ProductCategory> pcList) {
		this.pcList = pcList;
	}

	public List<Comment> getCommentList() {
		return commentList;
	}

	public void setCommentList(List<Comment> commentList) {
		this.commentList = commentList;
	}

	public Comment getComment() {
		return comment;
	}

	public void setComment(Comment comment) {
		this.comment = comment;
	}

}
