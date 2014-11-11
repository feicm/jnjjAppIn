<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>电子监控</title>
    <link rel="stylesheet" href="config/html/css/common.css">
    <link rel="stylesheet" href="config/html/css/reset.css">
</head>
<body class="m-4-1-3">
  <section class="bd">
  <c:if test="${json.success eq true}">
    <div>号牌种类：${json.msg.hpzl }</div>
    <div>号牌号码：${json.msg.hphm }</div>
<div>机动车所有人：${json.msg.jdcsyr }</div>
<div>车身颜色：${json.msg.csys }</div>
<div>车辆品牌：${json.msg.clpp }</div>
<div>交通方式：${json.msg.jtfs }</div>
<div>违法时间：${json.msg.wfsj }</div>
    <div>违法地址：${json.msg.wfdz }</div>
    <div>违法行为：${json.msg.wfxw }</div>
    <div>处理标记：${json.msg.clbj }</div>
    <div>交款标记：${json.msg.jkbj }</div>
    
    <div>采集机关名称：${json.msg.cjjgmc }</div>
    <div>处理机关名称：${json.msg.cljgmc }</div>
    <div>处理时间：${json.msg.clsj }</div>
    <div>交款日期：${json.msg.jkrq }</div>
	    <div>更新时间：${json.msg.gxsj }</div>
  </c:if>
</section>
</body>
</html>
