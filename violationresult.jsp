<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>查询结果列表页</title>
    <link rel="stylesheet" href="config/html/css/common.css">
    <link rel="stylesheet" href="config/html/css/reset.css">
</head>
<body>
<div class="ui-grid-b tab" id="tab-details">
<c:if test="${json.cxfs eq 0}">
    <a class="ui-block-a active" data-for="tab-item-01">违法处理</a>
    <a class="ui-block-b" data-for="tab-item-02">电子监控</a>
    <a class="ui-block-c" data-for="tab-item-03">强制措施</a>
</c:if>
<c:if test="${json.cxfs eq 1}">
    <a class="ui-block-a active" data-for="tab-item-01" style="width:50%">违法处理</a>
    <a class="ui-block-b" data-for="tab-item-02" style="width:50%">强制措施</a>
</c:if>
</div>
<h1 class="wzcx-t">${json.param}</h1>
<c:if test="${json.cxfs eq 0 }">
<div id="tab-item-01">
<c:if test="${json.violationsuccess eq true}">
  <ul class="wzcx-result">
	<c:forEach items="${json.violation }" var="qx">
        <li>
            <a target="_blank" href="${qx.url }"><c:out value="${qx.name}"></c:out></a>
        </li>
	</c:forEach>
</ul>
</c:if>
<c:if test="${json.violationsuccess eq false}">
<ul class="wzcx-result">
    <li>
        <a>查无结果</a>
	</li>
</ul>
</c:if>
</div>
<div style="display: none" id="tab-item-02">
<c:if test="${json.surveilsuccess eq true}">
  <ul class="wzcx-result">
	<c:forEach items="${json.surveil }" var="qx">
        <li>
            <a target="_blank" href="${qx.url}&xh=${qx.xh}"><c:out value="${qx.name}"></c:out></a>
        </li>
	</c:forEach>
</ul>
</c:if>
<c:if test="${json.surveilsuccess eq false}">
<ul class="wzcx-result">
    <li>
        <a>查无结果</a>
	</li>
</ul>
</c:if>
</div>
<div style="display: none" id="tab-item-03">
<c:if test="${json.forcesuccess eq true}">
  <ul class="wzcx-result">
	<c:forEach items="${json.force }" var="qx">
        <li>
            <a target="_blank" href="${qx.url }"><c:out value="${qx.name}"></c:out></a>
        </li>
	</c:forEach>
</ul>
</c:if>
<c:if test="${json.forcesuccess eq false}">
<ul class="wzcx-result">
    <li>
        <a>查无结果</a>
	</li>
</ul>
</c:if>
</div>
</c:if>
<!-- 查询方式为驾照查询 -->
<c:if test="${json.cxfs eq 1 }">
<div id="tab-item-01">
<c:if test="${json.violationsuccess eq true}">
  <ul class="wzcx-result">
	<c:forEach items="${json.violation }" var="qx">
        <li> 
            <a target="_blank" href="${qx.url }"><c:out value="${qx.name}"></c:out></a>
        </li>
	</c:forEach>
</ul>
</c:if>
<c:if test="${json.violationsuccess eq false}">
<ul class="wzcx-result">
    <li>
        <a>查无结果</a>
	</li>
</ul>
</c:if>
</div>
<div style="display: none" id="tab-item-02">
<c:if test="${json.forcesuccess eq true}">
  <ul class="wzcx-result">
	<c:forEach items="${json.force }" var="qx">
        <li>
            <a target="_blank" href="${qx.url }"><c:out value="${qx.name}"></c:out></a>
        </li>
	</c:forEach>
</ul>
</c:if>
<c:if test="${json.forcesuccess eq false}">
<ul class="wzcx-result">
    <li>
        <a>查无结果</a>
	</li>
</ul>
</c:if>
</div>
</c:if>
</body>
<script src="config/html/js/zepto.min.js"></script>
<script src="config/html/js/common.js"></script>
<script>
(function(){
    var tabDetail = document.querySelectorAll('#tab-details a');
    jnjjApp.tabToggle(tabDetail, 'active');
})();
</script>
</html>