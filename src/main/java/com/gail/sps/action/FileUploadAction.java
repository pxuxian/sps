package com.gail.sps.action;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.springframework.context.annotation.Scope;

import com.gail.sps.util.FileUtil;

/**
 * 文件上传功能
 *
 * @author pxuxian
 */
@Scope("prototype")
@ParentPackage("basePackage")
@Namespace("/")
public class FileUploadAction {

    private static final String imgPath = "/upload/img/content/";

    private File upload; // 文件
    private String uploadContentType; // 文件类型
    private String uploadFileName; // 文件名

    /**
     * ckeditor图片上传功能
     */
    @Action(value = "uploadPic")
    public void uploadPic() throws IOException {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();
        response.setContentType("text/html; charset=UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        PrintWriter out = response.getWriter();

        String uploadPath = ServletActionContext.getServletContext().getRealPath(imgPath); // 设置保存目录
        String fileName = UUID.randomUUID().toString(); // 采用UUID的方式随机命名
        fileName += uploadFileName.substring(uploadFileName.length() - 4);

        FileUtil.upload(upload, uploadPath, fileName);
        // 将上传的图片的url返回给ckeditor
        String callback = request.getParameter("CKEditorFuncNum");
        out.println("<script type=\"text/javascript\"> ");
        out.println("window.parent.CKEDITOR.tools.callFunction(" + callback + ",'" + imgPath + fileName + "',''" + ")");
        out.println("</script>");
        out.flush();
        out.close();
    }

    public File getUpload() {
        return upload;
    }

    public void setUpload(File upload) {
        this.upload = upload;
    }

    public String getUploadContentType() {
        return uploadContentType;
    }

    public void setUploadContentType(String uploadContentType) {
        this.uploadContentType = uploadContentType;
    }

    public String getUploadFileName() {
        return uploadFileName;
    }

    public void setUploadFileName(String uploadFileName) {
        this.uploadFileName = uploadFileName;
    }

}
