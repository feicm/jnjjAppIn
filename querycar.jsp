<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>查询车辆信息</title>
    <link rel="stylesheet" href="config/html/css/common.css">
    <link rel="stylesheet" href="config/html/css/reset.css">
    <!--select组件 css-->
    <link href="config/html/css/mobiscroll.scroller.css" rel="stylesheet" type="text/css"/>
    <link href="config/html/css/mobiscroll.scroller.ios7.css" rel="stylesheet" type="text/css"/>
    <link href="config/html/css/mobiscroll.animation.css" rel="stylesheet" type="text/css"/>
    <!--select组件 css end-->
    <script src="config/html/js/zepto.min.js" type="text/javascript"></script>
    <!-- session中获取号牌种类数据 -->
	<script src="config/html/js/WISPComponents_v3.0.js"></script>
	<!--<script src="config/html/js/card.js"></script>-->
	<script src="config/html/js/common.js"></script>
	<script src="config/html/js/query.js"></script>
	<!--select组件-->
	<script src="config/html/js/mobiscroll.all.js" type="text/javascript"></script>
	<!--select组件 end-->
</head>
<body class="bd">
<form id="clcx_f" action="adapter" method="post" class="wf-form" target="_blank">
    <!-- 车辆查询 B -->
    <label for="type">号牌种类</label>
    <select id="type" class="f-input select" name="hpzl">

    </select>

	<div class="ip-g">
		<label for="num">号牌号码</label>
		<b class="txt-ex">鲁A</b>
		<input id="num" name="hphm" class="f-input" placeholder="请输入号牌号码" value='M2618'/>
		
	</div>
	<input type="hidden" name="url" value="http://rjsoft.gnway.cc:9093/wisp_platform/platform/vehicle_viewVehicle.action">
    <a class="btn block" id="submit_btn_clcx">提交</a>
</form>
</body>
</html>
