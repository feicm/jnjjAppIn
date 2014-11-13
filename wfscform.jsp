<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>违法上传页</title>
    <link rel="stylesheet" href="config/html/css/common.css">
    <link rel="stylesheet" href="config/html/css/reset.css">
    <!--select组件 css-->
    <link href="config/html/css/mobiscroll.scroller.css" rel="stylesheet" type="text/css" />
    <link href="config/html/css/mobiscroll.scroller.ios7.css" rel="stylesheet" type="text/css" />
    <link href="config/html/css/mobiscroll.animation.css" rel="stylesheet" type="text/css" />
    <!--select组件 css end-->
    <script src="config/html/js/WISPComponents_v3.0.js"></script>
    <script src="config/html/js/zepto.min.js"></script>
    <!--select组件-->
    <script src="config/html/js/mobiscroll.all.js" type="text/javascript"></script>
    <!--select组件 end-->
	<script src="config/html/js/common.js"></script>
	<script src="config/html/js/wfzp.js"></script>
</head>
<body class="bd">
<form id="wf_upload" action="adapter" method="post" class="wf-form">
    <label for="type">车牌类型</label>
    <select class="f-input select" id="type">
    </select>
    <label for="num">车牌号码</label>
    <input id="num" class="f-input" placeholder="请输入车牌号码"/>
    <div class="ip-c">
		<label for="add">违法地点</label>
		<input id="add" class="f-input" placeholder="请输入违法地点"/>
        <a class="btn" data-for="add">搜索</a>
	</div>
	<div class="ip-c">
		<label for="action">违法行为</label>
		<input id="action" class="f-input" placeholder="请输入违法行为"/>
        <a class="btn" data-for="action">搜索</a>
    </div>
    <div class="print">
        <input type="checkbox" id="print" name="type" />
        <label for="print">打印</label>
        <a class="btn" id="go_print">打印预览</a>
    </div>
    <section class="camera ovh">
        <span id="phone_con">
        </span>
        <a class="take-photo" id="take_camera">
            <img src="config/html/images/phone_normal.png" /></br>
            <em>点击拍照</em>
        </a>
    </section>
    <input class="btn" type="button" value='提交' id="submit_btn" ontouchstart=""/>
    <input class="btn fr" type="button" value='重置' id="reset" ontouchstart=""/>
</form>
</body>
</html>
