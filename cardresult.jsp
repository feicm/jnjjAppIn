<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
  <head>
  <meta charset="utf-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
    <title>驾照查询结果</title>
    <link rel="stylesheet" href="config/html/css/common.css">
    <link rel="stylesheet" href="config/html/css/reset.css">
</head>
<body class="m-4-1-3">
  <section class="bd">
  <c:if test="${json.success eq true}">
    
    <div>档案编号：${json.msg.dabh }</div>
	<div>身份证明号码：${json.msg.sfzmhm }</div>
	    <div>身份证明名称：${json.msg.dabh }</div>
    
    
    <div>准驾车型：${json.msg.zjcx }</div>

	<div>下一清分日期：${json.msg.qfrq }</div>
<div>下一审验日期：${json.msg.syrq }</div>
<div>初次领证日期：${json.msg.cclzrq }</div>
<div>有效期止：${json.msg.yxqz }</div>
 <div>累计积分：${json.msg.ljjf }</div>
  <div>驾驶证状态：${json.msg.zt }</div>
<div>来源：${json.msg.ly }</div>
<div>管理部门：${json.msg.glbm }</div>
 <div>发证机关：${json.msg.fzjg }</div>
<div>更新时间：${json.msg.gxsj }</div>

	<div>证芯编号：${json.msg.zxbh }</div>
		<div>姓名：${json.msg.xm }</div>
			<div>性别：${json.msg.xb }</div>
       <div>登记住所详细地址：${json.msg.djzsxxdz }</div>
	       <div>联系住所详细地址：${json.msg.lxzsxxdz }</div>
		       <div>手机号码：${json.msg.sjhm }</div>
			   <div>是否本地：${json.msg.sfbd }</div>

   
    <div>审验有效期止：${json.msg.syyxqz }</div>
   
    <div>校车驾驶资格：${json.msg.xczg }</div>
	    <div>校车准驾车型：${json.msg.xczjcx }</div>
			    <div>人员状态：${json.msg.ryzt }</div>
					    <div>实习标记：${json.msg.sxbj }</div>

	</c:if>
	<c:if test="${json.success eq false}">
    <div>查无结果!</div>
	</c:if>
</section>
</body>
</html>
