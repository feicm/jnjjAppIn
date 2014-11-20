<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  <meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <title>登录</title>
    <link rel="stylesheet" href="config/html/css/common.css">
    <link rel="stylesheet" href="config/html/css/reset.css">
</head>
<body class="m-log">

 <form class="bd" action="" method="post" id="login-form">
      <div class="ui-circle-pic">
          <img src="config/html/images/touxiang.png">
      </div>
      <div>
          <input class="ipt-un" name="pname" id="username"/>
		  <label class="bgi-un"></label>
      </div>
      <div>
          <input type="password" class="ipt-pw" name="pwd" id="password"/>
		  <label class="bgi-pw"></label>
      </div>
      <!--<div class='mgt10 fl'>
          <input type="checkbox" id="ck_rem"/>
          <label class="rem-pw fs8" for="ck_rem">记住密码</label>
      </div>-->
      <input class="btn" type='button' value='登录' id="login-submit" />
     
  </form>

</body>
<script src="config/html/js/zepto.min.js"></script>
<script src="config/html/js/WISPComponents_v3.0.js"></script>
<script src="config/html/js/appConfig.js"></script>
<script src="config/html/js/common.js"></script>
<script src="config/html/js/login.js"></script>
</html>
