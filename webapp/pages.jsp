<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<s:if test="%{#commonPageList!=null&&#commonPageList.size>0}">
	<div class="pages">
		共 <span><s:property value="#commonPageList.totalRec" /> </span>条记录，
		<s:property value="#commonPageList.pageIndex" />
		/
		<s:property value="#commonPageList.totalPage" />
		页
		<s:if test="#commonPageList.totalPage>1">
			<a href="javascript:void(0);"
				onclick="javascript:submitPageSplit(1, ${pageSize });">首 页</a>
			<a href="javascript:void(0);"
				onclick="javascript:submitPageSplit(<s:property value="#commonPageList.pageIndex-1" />, <s:property value="#commonPageList.pageSize" />);">上一页</a>
			<a href="javascript:void(0);"
				onclick="javascript:submitPageSplit(<s:property value="#commonPageList.pageIndex+1" />, <s:property value="#commonPageList.pageSize" />);">下一页</a>
			<a href="javascript:void(0);"
				onclick="javascript:submitPageSplit(<s:property value="#commonPageList.totalPage" />, <s:property value="#commonPageList.pageSize" />);">末页</a>
		</s:if>
	</div>
	<script type="text/javascript">
		var pageIndex = "<s:property value='#commonPageList.pageIndex' />";
		function checkNum(input){
		   	var regu = /^(\d+)(\.?)(\d{0,2})$/; 
           	var re = new RegExp(regu); 
           	if (!re.test(input)) { 
              	return false; 
           	} 
         	return true;
       	}

		function submitPageSize(pageSize) {
			var form = document.getElementById("${param.formId}");
			var actionurl = "${param.formaction}" + "?pageSize=" + pageSize;
			document.cookie =escape("pageSize") + "=" +  escape(pageSize) + ";expires=-1";
			var args = '${param.params}';
			if (args != '') {
				actionurl += '&' + args;
			}
			form.action = actionurl;
			if('${param.formtarget}'!='')
			  	form.target ='${param.formtarget}';
			form.submit();
		}
       	
		function submitPageSplit(page, pageSize) {
			var form = document.getElementById("${param.formId}");
			var actionurl = "${param.formaction}" + "?page=" + page + "&pageSize=" + pageSize;
			var args = '${param.params}';
			if (args != '') {
				actionurl += '&' + args;
			}
			form.action = actionurl;
			if('${param.formtarget}'!='')
			  	form.target ='${param.formtarget}';
			form.submit();
		}
		
		$(document).ready(function() {
			$("#gopage").click(function() {
				var page = $("#pageNo").val();
				if (page == '') {
					alert("请输入要跳转的页号");
					$("#pageNo").focus();
					return;
				}
				if(page!=''&&!checkNum(page)){
					alert("请输入数字");
					$("#pageNo").focus();
					return;
				}
				var pageSize = '<s:property value="pageSize"/>';
				var firstPage = 1;
				var endPage = <s:property value="#commonPageList.totalPage"/>;
				if(page>endPage){
					page = endPage;
				}
				if(page<firstPage){
					page = firstPage;
				}
				submitPageSplit(page, pageSize);
			});
			
			$("#pageSizeSelect").change(function() {
				submitPageSize($("#pageSizeSelect").val());
			});
		});
	</script>
</s:if>
