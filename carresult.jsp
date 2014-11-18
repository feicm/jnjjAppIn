    <%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
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
        <title>车辆查询结果</title>
        <link rel="stylesheet" href="config/html/css/common.css">
        <link rel="stylesheet" href="config/html/css/reset.css">
        </head>
        <body class="m-4-1-3">
        <section class="bd">
        <c:if test="${json.success eq true}">
        <div class="divider">车辆基本信息</div>
        <div>车辆识别代号：${json.msg.clsbdh }</div>
        <div>号牌号码：${json.msg.hphm }</div>
        <div>车辆类型：${json.msg.cllx }</div>
        <div>车身颜色：${json.msg.csys }</div>
        <div>使用性质：${json.msg.syxz }</div>
        <div>身份证明名称：${json.msg.sfzmmc }</div>
        <div>初次登记日期：${json.msg.ccdjrq }</div>
        <div>检验有效期止：${json.msg.yxqz }</div>
        <div>强制报废期止：${json.msg.qzbfqz }</div>
        <div>发牌日期：${json.msg.fprq }</div>
        <div>保险终止日期：${json.msg.bxzzrq }</div>
        <div>车辆状态：${json.msg.clzt }</div>
        <div>发动机型号：${json.msg.fdjxh }</div>
        <div>核定载质量：${json.msg.hdzzl }</div>
        <div>核定载客：${json.msg.hdzk }</div>
        <div>环保达标情况：${json.msg.hbdbqk }</div>
        <div>最近定检日期：${json.msg.djrq }</div>
        <div>逾期检验强制报废期止：${json.msg.yqjyqzbfqz }</div>
        <div>逾期2个检验周期期止：${json.msg.yqjyqz2 }</div>
        <div>更新时间：${json.msg.gxsj }</div>
        <div class="divider">所有人基本信息</div>
        <div>住所详细地址：${json.msg.zsxxdz }</div>
        <div>联系电话：${json.msg.lxdh }</div>
        <div>手机号码：${json.msg.sjhm }</div>
        <div>是否微型面包车：${json.msg.wxmbc }</div>
        <div>是否农村地区使用：${json.msg.cdqsy }</div>
        <div>补领号牌次数：${json.msg.bpcs }</div>
        <div>车辆用途：${json.msg.clyt }</div>
        <div>管理部门：${json.msg.glbm }</div>
        </c:if>
        <c:if test="${json.success eq false}">
        <div>查无结果!</div>
        </c:if>
        </section>
        </body>
        </html>
