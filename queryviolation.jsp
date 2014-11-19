<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>查询违法信息</title>
    <link rel="stylesheet" href="config/html/css/common.css">
    <link rel="stylesheet" href="config/html/css/reset.css">
    <!--select组件 css-->
    <link href="config/html/css/mobiscroll.scroller.css" rel="stylesheet" type="text/css"/>
    <link href="config/html/css/mobiscroll.scroller.ios7.css" rel="stylesheet" type="text/css"/>
    <link href="config/html/css/mobiscroll.animation.css" rel="stylesheet" type="text/css"/>
	<script src="config/html/js/WISPComponents_v3.0.js"></script>
	<script src="config/html/js/zepto.min.js"></script>
	<!--select组件-->
	<script src="config/html/js/mobiscroll.all.js" type="text/javascript"></script>
	<!--select组件 end-->
    <script src="config/html/js/appConfig.js"></script>
	<script src="config/html/js/common.js"></script>
	<script src="config/html/js/query.js"></script>
</head>
<body class="bd">
<form action="adapter" method="post" id="wzcx_f" class="wf-form" target="_blank">

    <label for="type-01">查询方式</label>
    <select class="f-input select" name="cxfs" id="type-01" >
    </select>

    <div id="a1" style="display: block">
        <label for="hpzl">号牌种类</label>
        <select class="f-input select" name="hpzl" id="hpzl">
        </select>
        <label for="IDnum">号牌号码</label>
        <input id="IDnum" value='鲁AE2751' name="hphm" class="f-input" placeholder="请输入有效号牌号码"/>
        <div class='print'>
            <input type="checkbox" id="nodo01" name="hockitem">
            <label for="nodo01">未处理</label>
            <input type="checkbox" id="nodo02" name="hockitem">
            <label for="nodo02">未缴费</label>
        </div>
    </div>
    <div id="a2" style="display: none">
        <label for="zjlx">证件类型</label>
        <select class="f-input select" name="zjlx" id="zjlx">

        </select>
        <label for="IDnum2">证件号码</label>
        <input id="IDnum2" name="zjhm" class="f-input" placeholder="请输入有效证件号码"/>
        <div class='print'>
            <input type="checkbox" id="nodo03" name="hockitem">
            <label for="03">未交款</label>
        </div>
    </div>
    <input type="submit" class="btn block" value='提交' id="button"/>
	<input type="hidden" name="url" value="http://rjsoft.gnway.cc:9093/wisp_platform/platform/vioViolation_listVioInfo.action" />
</form>
</body>
</script>
</html>
