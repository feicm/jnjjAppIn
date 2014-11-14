<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
   <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>查询驾照信息</title>
    <link rel="stylesheet" href="config/html/css/common.css">
    <link rel="stylesheet" href="config/html/css/reset.css">
    <!--select组件 css-->
    <link href="config/html/css/mobiscroll.scroller.css" rel="stylesheet" type="text/css" />
    <link href="config/html/css/mobiscroll.scroller.ios7.css" rel="stylesheet" type="text/css" />
    <link href="config/html/css/mobiscroll.animation.css" rel="stylesheet" type="text/css" />
    <!--select组件 css end-->
		<script src="config/html/js/zepto.min.js" type="text/javascript"></script>
	<!-- session中获取号牌种类数据 -->
	<script src="config/html/js/WISPComponents_v3.0.js"></script>

	<!--select组件-->
	<script src="config/html/js/mobiscroll.all.js" type="text/javascript"></script>
	<!--select组件 end-->
    <script src="config/html/js/appConfig.js"></script>
	<script src="config/html/js/common.js"></script>
	<script src="config/html/js/query.js"></script>
</head>
<body class="bd">
    <form action="adapter" method="post" id="jzcx_f" class="wf-form" target="_blank">
        <!--驾照查询 B-->
        <label for="type">证件类型</label>
        <select class="f-input select" id="type" name="zjlx">
        </select>
        <label for="num">证件号码</label>
        <input id="num" name="zjhm" class="f-input" placeholder="请输入证件号码" value="3740016869582"/>  
		<input type="submit" class="btn block" value='提交' id="button" />
        <input type="hidden" name="url" value="http://rjsoft.gnway.cc:9093/wisp_platform/platform/drivinglicense_viewDrivinglicense.action" />
    </form>
	</body>
</html>
