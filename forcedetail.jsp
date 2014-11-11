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
    <title>强制措施</title>
    <link rel="stylesheet" href="config/html/css/common.css">
    <link rel="stylesheet" href="config/html/css/reset.css">
</head>
<body class="m-4-1-3">
  <section class="bd">
  <c:if test="${json.success eq true}">
    <div>凭证编号：${json.msg.pzbh }</div>
    <div>驾驶证号：${json.msg.jszh }</div>
    <div>档案编号：${json.msg.dabh }</div>
    <div>当事人：${json.msg.dsr }</div>

    <div>号牌种类：${json.msg.hpzl }</div>
    <div>号牌号码：${json.msg.hphm }</div>
    <div>机动车所有人：${json.msg.jdcsyr }</div>
    <div>交通方式：${json.msg.jtfs }</div>
	    <div>违法时间：${json.msg.wfsj }</div>


    <div>违法地址：${json.msg.wfdz }</div>
    <div>违法行为1：${json.msg.wfxw1 }</div>
	    <div>违法行为2：${json.msg.wfxw2 }</div>
		    <div>违法行为3：${json.msg.wfxw3 }</div>
			    <div>违法行为4：${json.msg.wfxw4 }</div>
				    <div>违法行为5：${json.msg.wfxw5 }</div>
    <div>强制措施类型：${json.msg.qzcslx }</div>
    <div>裁决标记：${json.msg.cjbj }</div>
	    <div>裁决时间：${json.msg.cjsj }</div>

    <div>决定书编号：${json.msg.jdsbh }</div>
    <div>更新时间：${json.msg.gxsj }</div>
    
  </c:if>
</section>
</body>
</html>
