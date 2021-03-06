/*
 * login.js
 * */
var Login = (function () {
    /*
     * 登录
     * */
    var submit = document.getElementById('login-submit');
    var usernameInput = document.getElementById('username');
    usernameInput.addEventListener('blur', SetPwdAndChk, false);
    jnjjApp.btnHover('login-submit', 'login-btn-hover');
    var username,
        password,
        IMEI,
        VERSION;
    /*
     * 登录函数
     * */
    var loginListener = function () {
        var self = this;
        username = document.getElementById('username').value;
        password = document.getElementById('password').value;
        self.removeEventListener('click', loginListener, false);
        if ( username === '' ) {
            alert('用户名不能为空！');
            submit.addEventListener('click', loginListener, false);
        } else {
            if ( password === '' ) {
                alert('密码不能为空！');
                submit.addEventListener('click', loginListener, false);
            } else {
                Wisp.UI.progressDialog.show('登录中，请稍后！');
                //jnjjApp.cookie.SetCookie('JingYuanBianHao', username);
                //jnjjApp.sendPersonalInfo('Device'); //login debug
                jnjjApp.PersonalInfo = new Wisp.ClientResource.PersonalInfo({
                    "username"     : username,
                    "pwd"          : '123',
                    "ip"           : jnjjApp.config.domain,
                    "port"         : jnjjApp.config.openfirePort,
                    "fileServerUrl": "http://" + jnjjApp.config.domain + ":" + jnjjApp.config.fileServerPort + "/fileTrans/PostFile"
                });//实例化个人信息接口
                jnjjApp.PersonalInfo.send('jnjjApp.sendPersonalInfo');//调用发送函数
                SetPwdAndChk();//‘记住密码’功能
            }
        }
    };
    submit.addEventListener('click', loginListener, false);
    /*
     * 记住账号、密码
     * */
    function GetLastUser() {
        var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";//GUID标识符
        var usr = jnjjApp.cookie.GetCookie(id);
        if ( usr != null ) {
            document.getElementById('username').value = usr;
        } else {
            document.getElementById('username').value = "";
        }
        GetPwdAndChk();
    }

    //点击登录时触发客户端事件
    function SetPwdAndChk() {
        //取用户名
        var usr = document.getElementById('username').value;
        //将最后一个用户信息写入到Cookie
        SetLastUser(usr);
        //如果记住密码选项被选中
        if ( document.getElementById('ck_rem').checked == true ) {
            //取密码值
            var pwd = document.getElementById('password').value;
            var expdate = new Date();
            expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
            //将用户名和密码写入到Cookie
            jnjjApp.cookie.SetCookie(usr, pwd, expdate);
        } else {
            //如果没有选中记住密码,则立即过期
            jnjjApp.cookie.ResetCookie();
        }
    }

    function SetLastUser(usr) {
        var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";
        var expdate = new Date();
        //当前时间加上两周的时间
        expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
        jnjjApp.cookie.SetCookie(id, usr, expdate);
    }

    //用户名失去焦点时调用该方法
    function GetPwdAndChk() {
        var usr = document.getElementById('username').value;
        var pwd = jnjjApp.cookie.GetCookie(usr);
        if ( pwd != null ) {
            document.getElementById('ck_rem').checked = true;
            document.getElementById('password').value = pwd;
        } else {
            document.getElementById('ck_rem').checked = false;
            document.getElementById('password').value = "";
        }
    }

    /*
     * 工具栏数据格式
     * */
    var toolbarDatas = {
        "toolbar": {
            "title"   : "济南交警",
            "leftBtn" : {},//工具栏左侧按钮配置，可选
            "rightBtn": {}//工具栏右侧按钮配置，可选
        }
    };

    /*
     *  页脚主导航数据格式，3-5组，不超过5组
     * */
    var footbarDatas = {
        "footbar": [
            {
                "beforeImg"   : "config/html/images/wispui/shouye_normal.png",
                "afterImg"    : "config/html/images/wispui/shouye_hover.png",
                "name"        : "首页",
                "clickEvent"  : "",
                "subBtns"     : [],
                "shortcutBtns": [
                    {
                        "type": "",//用于分组，为空时不显示
                        "data": [
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/clcx_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/clcx_hover.png", //点击时图标
                                "disableImg": "",//按钮不可用图片，即 "enable"    : "false"
                                "enable"    : "true",
                                "name"      : "车辆查询",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/querycar.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/jzcx_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/jzcx_hover.png", //点击时图标
                                "disableImg": "",
                                "enable"    : "true",
                                "name"      : "驾驶证查询",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/querycard.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/wzcx_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/wzcx_hover.png", //点击时图标
                                "disableImg": "",
                                "enable"    : "true",
                                "name"      : "违法查询",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/queryviolation.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/wfzp_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/wfzp_hover.png", //点击时图标
                                "disableImg": "",
                                "enable"    : "true",
                                "name"      : "违法抓拍",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "adapter?url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/wfscform.jsp"
                            },
                            {
                                "btnType"   : "icobtn",//带图标按钮 ;txtbtn,纯文本
                                "beforeImg" : "config/html/images/wispui/wsdy_normal.png",//点击前图标
                                "afterImg"  : "config/html/images/wispui/wsdy_hover.png", //点击时图标
                                "disableImg": "",
                                "enable"    : "true",
                                "name"      : "文书打印",
                                "iconpos"   : "top",//图标位置——top|bottom|left|right|notxt上、下、左、右、无文字
                                "clickEvent": "",
                                "url"       : "config/html/print.html?action=print"
                            }
                        ]
                    }
                ]
            },
            {
                "beforeImg" : "config/html/images/wispui/xinxi_normal.png",
                "afterImg"  : "config/html/images/wispui/xinxi_hover.png",
                "name"      : "信息",
                "clickEvent": "",
                "subBtns"   : []
            },
            {
                "beforeImg" : "config/html/images/wispui/chaxun_normal.png",
                "afterImg"  : "config/html/images/wispui/chaxun_hover.png",
                "name"      : "查询",
                "clickEvent": "",
                "subBtns"   : [    //客户端通过webView和服务端通信
                    {
                        "name": "车辆查询",
                        "url" : "adapter?url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/querycar.jsp"
                    },
                    {
                        "name": "驾驶证查询",
                        "url" : "adapter?url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/querycard.jsp"
                    },
                    {
                        "name": "违法查询",
                        "url" : "adapter?url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/queryviolation.jsp"
                    }
                ]
            },
            {
                "beforeImg" : "config/html/images/wispui/neibutongxun_normal.png",
                "afterImg"  : "config/html/images/wispui/neibutongxun_hover.png",
                "name"      : "通讯录",
                "clickEvent": "",
                "requestUrl": jnjjApp.config.requestUrl + "/wispcms/adapter?open&url=" + jnjjApp.config.requestUrl + "/wispcms/addresslist.action",
                "subBtns"   : []
            }
        ]
    };
    /*
     * 客户端登录回调函数
     * @param keywords 回传参数键名 Result(openfire登录结果)/Device(设备信息)
     * @param value 回传参数键值 Result:Success/Fail;Device:1234
     * */
    jnjjApp.sendPersonalInfo = function (keywords, value) {
        switch ( keywords ) {
            case "Result":
                if ( value === 'Success' ) {
                    Wisp.UI.progressDialog.remove();
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('登录失败！');
                    submit.addEventListener('click', loginListener, false);
                }
                break;
            case "Device":
                var bmdm;
                if ( jnjjApp.config.domain === 'rjsoft.gnway.cc' ) {//开发环境写死
                    IMEI = '352824061689037';
                    bmdm = '370102';
                } else {
                    IMEI = value.split('|')[0].split(':')[1];
                }
                VERSION = value.split('|')[1].split(':')[1];//版本号
                $.ajax({ //获取个人信息
                    type    : 'POST',
                    url     : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/personal.action",
                    data    : {pname: username},
                    dataType: 'json'
                }).done(function (data) {//获取完成个人信息后执行
                    console.dir(data);
                    var msg = data.msg;
                    var nameCH = msg.xm;
                    var imgSrc = msg.tx;
                    msg.bmdmt && (bmdm = msg.bmdmt);
                    jnjjApp.cookie.SetCookie('BuMenDaiMa', bmdm);
                    jnjjApp.cookie.SetCookie('XingMing', nameCH);
                    jnjjApp.cookie.SetCookie('JingYuanBianHao', username);
                    /*
                     * 侧栏（个人中心数据格式）
                     * */
                    var siderDatas = {
                        "sider": {
                            "info": {
                                "id"  : username,
                                "img" : imgSrc,
                                "name": nameCH
                            },
                            "list": [
                                {
                                    "beforeImg" : "config/html/images/wispui/pwd_normal.png",
                                    "afterImg"  : "config/html/images/wispui/pwd_hover.png",
                                    "name"      : "密码修改",
                                    "clickEvent": "",
                                    "url"       : "adapter?url=" + jnjjApp.config.requestUrl + "/wispcms/config/html/repwd.jsp",
                                    "subBtns"   : []
                                }
                            ]
                        }
                    };
                    getInfoCallback(toolbarDatas, footbarDatas, siderDatas); //初始化footbar数据
                }).fail(function (data) { //获取个人信息失败
                    Wisp.UI.progressDialog.remove();
                    alert('登录失败！\n请检查网络是否连接正常！');
                    submit.addEventListener('click', loginListener, false);
                });
                break;
        }
    }
    //获取个人信息回调
    function getInfoCallback(toolbarDatas, footbarDatas, siderDatas) {
        $.ajax({//获取栏目数据源
            type    : 'post',
            url     : '/wispcms/channel/tree.do?id=1',
            data    : {'jybh': jnjjApp.cookie.GetCookie('JingYuanBianHao'),'cid': '2436'},
            dataType: 'json',
            success : function (data) {
                if ( data.success ) {
                    var datas = initColInfo(data.msg);//格式化栏目数据源
                    footbarDatas.footbar[1].subBtns = datas;
                    getcalCallback(toolbarDatas, footbarDatas, siderDatas);
                }
            },
            error   : function () {
                console.log('error')
            }
        });
    }

    //获取栏目信息回调函数
    function getcalCallback(toolbarDatas, footbarDatas, siderDatas) {
        $.ajax({ //登录验证请求
            type    : 'POST',
            url     : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/login.action",
            data    : {pname: username, pwd: password, imei: IMEI, version: VERSION},
            dataType: 'json'
        }).done(function (data) {//登录表单提交
            console.dir(data);
            if ( data ) {
                if ( data.success ) {
                    Wisp.UI.Init({
                        'type' : 'toolbar',
                        'datas': toolbarDatas
                    });
                    Wisp.UI.Init({
                        'type' : 'footbar',
                        'datas': footbarDatas
                    });
                    Wisp.UI.Init({
                        'type' : 'sider',
                        'datas': siderDatas
                    });
                    //客户端继续登录openfire
                } else {
                    Wisp.UI.progressDialog.remove();
                    alert('用户名或密码错误！');
                    submit.addEventListener('click', loginListener, false);
                }
            } else {
                Wisp.UI.progressDialog.remove();
                alert('登录失败!');
                submit.addEventListener('click', loginListener, false);
            }
        }).fail(function (msg) {
            Wisp.UI.progressDialog.remove();
            alert('登录失败!\n请检查网络是否连接正常！');
            submit.addEventListener('click', loginListener, false);
        });
    }

    function initColInfo(data) { //格式化栏目数据源函数
        var colDate = [],//栏目数据，即二级菜单数据
            colItem;//栏目数据项
        for ( var i in data ) {
            colItem = {
                "name"      : data[i].name,
                "requestUrl": data[i].url + "inner"
            };
            colDate.push(colItem);
        }
        return colDate;
    }

    GetLastUser();
})();