(function () {
    Wisp = window.Wisp || {};
    /*
     * 客户端回调函数数据对象集
     * */
    Wisp.ClientCallback = {
        setBaseDomain : function (baseDomain) { //(客户端)当前域写入localstorage
            App.LS.set("App_baseDomain", baseDomain);
        },
        fillQRcodeText: function (domId, txt) {//二维码扫描回调
            document.getElementById(domId).value=txt;
        }
    };
    /*
     * 客户端UI组件对象集
     * */
    Wisp.UI = (function () {
        var Init = function (opts) {
            var type = opts.type,
                datas = opts.datas;
            switch ( type ) {
                case 'footbar':
                    new Footbar(datas);
                    break;
                case 'toolbar':
                    new Toolbar(datas);
                    break;
                case 'sider':
                    new Sider(datas);
                    break;
                case 'dialog':
                    new Dialog(datas);
                    break;
                default:
                    console.log('地球已经不适合你，回火星去吧！！！');
            }
        };
        /*
         * UI.Toolbar 工具栏组件
         * */
        var Footbar = function (opts) {
            this._config = opts;//ui配置信息
            this._init();
        };
        Footbar.prototype._init = function () {
            console.dir(this._config);
            Wisp.CommenFunc.SendToWISPClient('post', '@@footbar@@', JSON.stringify(this._config), false);
        };
        /*
         * UI.Toolbar 工具栏组件
         * */
        var Toolbar = function (opts) {
            this._config = opts;//ui配置信息
            this._init();
        };
        Toolbar.prototype._init = function () {
            console.dir(this._config);
            Wisp.CommenFunc.SendToWISPClient('post', '@@toolbar@@', JSON.stringify(this._config), false);
        };
        /*
         * UI.Sider 侧边栏组件
         * */
        var Sider = function (opts) {
            this._config = opts;//ui配置信息
            this._init();
        };
        Sider.prototype._init = function () {
            console.dir(this._config);
            Wisp.CommenFunc.SendToWISPClient('post', '@@sider@@', JSON.stringify(this._config), false);
        };
        /*
         * UI.Dialog 对话框组件
         * */
        var Dialog = function (opts) {
            this._config = opts;//ui配置信息
            this._init();
        };
        Dialog.prototype._init = function () {
            console.dir(this._config);
            Wisp.CommenFunc.SendToWISPClient('post', '@@dialog@@', JSON.stringify(this._config), false);
        };

        var progressDialog = {   //加载对话框
            "show"  : function (content) {
                this.content = content;
                Wisp.CommenFunc.SendToWISPClient('post', '@@showProgressDialog@@', JSON.stringify(this), false);
            }, //打开
            "remove": function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@dismissProgressDialog@@', '', false);
            } //移除加载对话框
        };
        var loginResult = {   //登录结果
            "success": function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@loginSuccess@@', '', false);
            }, //成功
            "fail"   : function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@loginFail@@', '', false);
            } //失败
        };
        var Webview = {   //webview操作 即window 操作
            "pageId"       : null,
            "init"         : function (opts) {
                this.pageId = opts.PageId;
                this.callback = opts.callback || null;
                return this;
            },
            "close"        : function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@closeWebviewWidget@@', JSON.stringify(this), false);
            }, //关闭指定webview
            "refresh"      : function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@refreshWebviewWidget@@', JSON.stringify(this), false);
            }, //刷新指定webview
            "getBaseDomain": function (callback) {
                this.callback = callback || null;
                Wisp.CommenFunc.SendToWISPClient('post', '@@getBaseDomain@@', JSON.stringify(this), false);
            }
        };
        var Gallery = {   //打开轮播
            "open": function (opts) {
                this.currentPage = opts.active + '';
                this.images = opts.images;
                Wisp.CommenFunc.SendToWISPClient('post', '@@openGallery@@', JSON.stringify(this), false);
            }
        };
        var fullScreen = {   //全屏控制
            "open" : function () {
            }, //打开
            "close": function () {
            } //关闭
        };
        var zoomWindow = {  //窗口缩放
            "zoomIn" : function () {
            },//放大
            "zoomOut": function () {
            }//缩小
        };
        return {
            "Init"          : Init, //初始化
            "progressDialog": progressDialog,//加载对话框
            "loginResult"   : loginResult,//登录结果
            "Webview"       : Webview,//webview操作
            "Gallery"       : Gallery,//实例化相册
            "fullScreen"    : fullScreen,//TODO 全屏
            "zoomWindow"    : zoomWindow //TODO 窗口缩放
        }
    })();
    /*
     * 客户端接口公共函数对象
     * */
    Wisp.CommenFunc = (function () {
        var GetXmlhttpWISPClient = function () {
            var xmlhttp;
            try {
                xmlhttp = new window.XMLHttpRequest();
                typeFlag = true;
            } catch ( e ) {
                var ActiveXName = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0',
                    'MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 'Msxml2.XMLHTTP',
                    'MSXML.XMLHttp', 'Microsoft.XMLHTTP']

                function XMLHttpActiveX() {
                    var e;
                    for ( var i = 0; i < ActiveXName.length; i++ ) {
                        try {
                            var ret = new ActiveXObject(ActiveXName[i]);
                            typeFlag = false;
                        } catch ( e ) {
                            continue;
                        }
                        return ret;
                    }
                    throw {
                        "message": "XMLHttp ActiveX Unsurported."
                    };
                }

                try {
                    xmlhttp = new XMLHttpActiveX();
                    typeFlag = false;
                } catch ( e ) {
                    throw new Error(0, "XMLHttpRequest Unsurported.");
                }
            }
            return xmlhttp;
        };
        var SendToWISPClient = function (method, type, param, async) {
            var urlPre = "AjAxSocketIFC/" + type + "?";
            var App = App || {};
            if ( App && App.localHost !== undefined ) {
                urlPre = App.localHost + '/' + urlPre;
            }
            if ( method == 'get' && param != '' ) {
                urlPre += encodeURIComponent(param) + '&';
            }
            urlPre += "date="
            + new Date();
            var xmlhttp = GetXmlhttpWISPClient();
            var result = "";
            if ( async ) {
                // 异步
                xmlhttp.onreadystatechange = function () {
                    if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
                        var text = xmlhttp.responseText;
                        console.dir(text);//打印返回信息
                        result = text;
                    }
                }
            }
            try {
                xmlhttp.open(method, urlPre, async);
                if ( method == 'post' ) {
                    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    console.info("Request client UI:" + type + " start!");
                    xmlhttp.send(param);
                    console.info("Request client UI:" + type + " end!");
                } else {
                    //get请求
                    xmlhttp.send();
                }
            }
            catch ( e ) {
            }
            if ( !async ) { // 同步
                try {
                    var text = xmlhttp.responseText;
                    result = text;
                } catch ( e ) {
                    return param;
                }
            }
            return result;
        };

        function getRandom() {//获取0-100随机数
            return parseInt(Math.random() * 100);
        }

        /*
         * 附件上传接口
         * @param path 文件路径
         * @param posturl 文件上传地址
         * @param callback 上传回调函数 参数(key,value)：eg:(Result,Success/Fail)  或 (ImageID,value)
         * */
        var PostFile = function (opts) {
            this.path = opts.path;
            this.posturl = opts.postUrl;
            this.callback = opts.callback || null;
        };//通用上传接口
        PostFile.prototype = {
            "uploadFile"   : function () {
                var self = this;
                Wisp.CommenFunc.SendToWISPClient('post', '@@uploadfile@@', JSON.stringify(self), false);
            },
            "uploadSuccess": function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@uploadsuccess@@', '', false);
            },
            "uploadFail"   : function () {
                Wisp.CommenFunc.SendToWISPClient('post', '@@uploadfail@@', '', false);
            }
        };
        return {
            "SendToWISPClient": SendToWISPClient,//网客户端发送资源共有方法
            "getRandom"       : getRandom,//获取0-100随机数
            "PostFile"        : PostFile//通用上传接口
        }
    })();
    /*
     * 客户端资源接口对象集
     * */
    Wisp.ClientResource = (function () {
        var HandWriting = function () {
        };//客户端手写功能
        var MeetingMobi = function () {
        };//移动会议功能
        var DocRevision = function () {
        };//正文批阅功能
        var PDFNotation = function () {
        };//PDF批注功能
        var DocReader = function () {
        };//文档阅读器
        var Camera = function () {
        };//客户端拍照功能
        Camera.prototype = {
            "open": function (callback) {
                this.callback = callback;
                Wisp.CommenFunc.SendToWISPClient('post', '@@openCamera@@', JSON.stringify(this), false);
            }
        };
        var PersonalInfo = function (opts) {
            this.username = opts.username;
            this.pwd = opts.pwd;
            this.ip = opts.ip;
            this.port = opts.port;
            this.fileServerUrl = opts.fileServerUrl;
        };//个人信息接口
        PersonalInfo.prototype = {
            "send": function (callback) {
                this.callback = callback || null;
                Wisp.CommenFunc.SendToWISPClient('post', '@@sendPersonalInfo@@', JSON.stringify(this), false);
            }
        };
        /*
         * 打印功能
         * @param event 事件名称
         * @param opts 接口参数
         * @param callback 回调函数
         * @return Printer 返回打印对象
         * */
        var Printer = function (event, opts, callback) {
            var type = {
                "open": "open"
            };//event事件映射表
            if ( !(event && opts) ) {
                return;
            }
            var P = {
                "init": function () {
                    var index = event;
                    this.url = opts.targetpage;
                    callback && (this.callback = callback);
                    type[index] && this[type[index]]();
                },
                "open": function () {
                    Wisp.CommenFunc.SendToWISPClient('post', '@@openPrinter@@', JSON.stringify(this), false);
                }
            };
            P.init();//打印接口初始化
            return P;//返回打印对象
        };
        /*
         * 二维码功能
         * @param event 事件名称
         * @param opts 接口参数
         * @param callback 回调函数
         * @return QRcode 返回二维码对象
         * */
        var QRcode = function (event, opts, callback) {
            var type = {
                "open": "open"
            };//event事件映射表
            if ( arguments.length < 3 ) {
                if ( !arguments[1] instanceof Object ) {
                    callback = arguments[1]
                }
            }
            var QR = {
                "init": function () {
                    var index = event;
                    this.domId = opts.domId;//input id
                    callback && (this.callback = callback); //回调函数
                    type[index] && this[type[index]]();
                },
                "open": function () {
                    Wisp.CommenFunc.SendToWISPClient('post', '@@openQRcode@@', JSON.stringify(this), false);
                }
            };
            QR.init();//二维码接口初始化
            return QR;//返回二维码对象
        };
        return {
            "Camera"      : Camera, //调用照相机
            "PersonalInfo": PersonalInfo, //获取个人信息
            "Printer"     : Printer, //打印接口
            "QRcode"      : QRcode //二维码扫描功能
        }
    })();
})();