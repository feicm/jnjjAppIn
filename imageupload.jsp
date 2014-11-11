<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'imageupload.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
    <form name="imgUpload" action="adapter?open&url=http://rjsoft.gnway.cc:9093/wisp_platform/platform/imageUpload.action" method="post" enctype="multipart/form-data">
    	<input name="file" type="file">
    	<input name="file" type="file">
    	<input name="file" type="file">
    	<input name="file" type="file">
    	<input name="file" type="file">
	    <input type="submit" name="submit" value="提交" >
	    <input type="reset" name="reset" value="重置" >
    </form>
  </body>
</html>
