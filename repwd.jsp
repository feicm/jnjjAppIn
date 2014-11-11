<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
	<title>密码修改</title>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maxmum-scale=1.0,user-scalable=no"/>
    <link rel="stylesheet" href="config/html/css/common.css">
    <link rel="stylesheet" href="config/html/css/reset.css">
</head>
<body>
   <form id="reset_pwd" action="" method="post" class="r-pwd">
       <label for="oldpwd">原密码：</label>
       <input type="password" class="ip" id="oldpwd" placeholder="请输入原密码"/>
       <label for="newpwd">新密码：</label>
       <input type="password" class="ip" id="newpwd" placeholder="请输入新密码"/>
       <label for="twicenewpwd">确认新密码：</label>
       <input type="password" class="ip" id="confirmpwd" placeholder="请再次输入新密码"/>
       <input type='button' class="btn" value='确定' id="pwd-submit" />
   </form>
</body>
<script src="config/html/js/zepto.min.js"></script>
<script src="config/html/js/repwd.js"></script>
</html>
