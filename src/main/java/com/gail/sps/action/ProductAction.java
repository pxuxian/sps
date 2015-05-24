package com.gail.sps.action;

import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
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
	HttpServletResponse response = ServletActionContext.getResponse();

	private Product p;
	private List<ProductCategory> pcList;
	private Comment comment;
	private List<Comment> commentList;
	private List<Product> hotProductList;

	@Action(value = "detail", results = { @Result(name = "success", location = "/detail.jsp") })
	public String detail() {
		try {
			this.p = productService.getById(id);
			this.pcList = productCategoryService.limitSelect(new ProductCategory());
			this.commentList = commentService.queryByProductId(id);
			this.hotProductList = productService.listHotProducts();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return SUCCESS;
	}

	@Action(value = "ajax_addComment")
	public void ajax_addComment() {
		response.setContentType("text/html;charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache");
		PrintWriter out =  null;
		try {
			out = response.getWriter();
			commentService.addComment(comment);
			out.write("");
		} catch (Exception e) {
			e.printStackTrace();
			out.write(e.getMessage());
		}
		out.close();
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

	public List<Product> getHotProductList() {
		return hotProductList;
	}

	public void setHotProductList(List<Product> hotProductList) {
		this.hotProductList = hotProductList;
	}

}
