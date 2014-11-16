var jnjjApp = jnjjApp || {}; //济南交警APP全局对象
(function () {
    /*
     * 操作cookie
     * */
    jnjjApp.cookie = {
        "SetCookie"   : function (name, value, expires) {
            var argv = arguments;
            var argc = arguments.length;
            var expires = (argc > 2) ? argv[2] : null;
            var path = (argc > 3) ? argv[3] : null;
            var domain = (argc > 4) ? argv[4] : null;
            var secure = (argc > 5) ? argv[5] : false;
            document.cookie = name + "=" + escape(value) + ((expires == null) ?
                "" : ("; expires=" + expires.toGMTString())) + ((path == null) ?
                "" : ("; path=" + path)) + ((domain == null) ?
                "" : ("; domain=" + domain)) + ((secure == true) ?
                "; secure" : "");
        },
        "GetCookie"   : function (name) {
            var arg = name + "=";
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while ( i < clen ) {
                var j = i + alen;
                //alert(j);
                if ( document.cookie.substring(i, j) == arg ) return jnjjApp.cookie.getCookieVal(j);
                i = document.cookie.indexOf(" ", i) + 1;
                if ( i == 0 ) break;
            }
            return null;
        },
        "getCookieVal": function (offset) {
            var endstr = document.cookie.indexOf(";", offset);
            if ( endstr == -1 ) endstr = document.cookie.length;
            return unescape(document.cookie.substring(offset, endstr));
        },
        "ResetCookie" : function () {
            var usr = document.getElementById('username').value;
            var expdate = new Date();
            jnjjApp.cookie.SetCookie(usr, null, expdate);
        }
    };
    /*
     * 模拟按钮高亮
     * */
    jnjjApp.btnHover = function (id, className) {
        var btn = document.getElementById(id);
        btn.addEventListener("touchstart", function () {
            this.classList.add(className);
        }, false);
        btn.addEventListener("touchend", function () {
            this.classList.remove(className);
        }, false);
    };
    /*
     * 通过数组值获取数组下标
     * */
    jnjjApp.getArrIndex = function (value, arr) {
        for ( var i in arr ) {
            if ( arr[i] === value ) {
                return i;
            }
        }
    };
    /*
     * 获取当前时间
     * */
    jnjjApp.CurentTime = function (type) {
        var type = type || '';
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var clock = year + "年";
        if ( month < 10 )
            clock += "0";
        clock += month + "月";
        if ( day < 10 )
            clock += "0";
        clock += day + "日 ";
        if ( type == 'detail' ) {
            if ( hh < 10 )
                clock += "0";
            clock += hh + "时";
            if ( mm < 10 ) clock += '0';
            clock += mm + "分";
        }
        return (clock);
    };
    /*
     * 下拉控件二次封装
     * */
    jnjjApp.Select = function (opts) {
        this.dom = opts.dom;
        this.url = opts.url;
        this.dataType = opts.dataType;
        this.callback = opts.callback || null;
        this.init();
    };
    jnjjApp.Select.prototype = {
        "init": function () {
            var self = this;
            $.post(self.url, function (result) {
                var json = eval('(' + result + ')');
                var list = eval(json.msg);
                var selectItem = "";
                if ( self.dataType === 'Object' ) {
                    for ( var j in list ) {
                        selectItem += "<option value='" + list[j].key + "'>" + list[j].name + "</option>";
                    }
                }
                /* 违法抓拍地点下拉控件 update by crh 2014-09-04*/
                else if ( self.dataType === 'Wfddbh' ) {
                    for ( var j in list ) {
                        selectItem += "<option value='" + list[j].ddbh + "'>" + list[j].ddmc + "</option>";
                    }
                }
                else {
                    for ( var j in list ) {
                        selectItem += "<option value='" + j + "'>" + list[j] + "</option>";
                    }
                }
                self.dom.append(selectItem);
                self.dom.mobiscroll().select({
                    theme   : 'ios7',
                    lang    : 'zh',
                    display : 'bottom',
                    mode    : 'scroller',
                    minWidth: 200
                });
                self.callback !== null ? self.callback() : null;
            });
        }
    }
    /*
     * tab切换函数
     * */
    jnjjApp.tabToggle = function (tabItem, activeClass, defauleClass) {
        for ( var i = 0; i < tabItem.length; i++ ) {
            tabItem[i].addEventListener('click', function (e) {
                var dataFor = this.getAttribute("data-for");
                var currentTabContent = document.getElementById(dataFor);
                if ( !this.classList.contains(activeClass) ) {
                    if ( defauleClass ) {
                        this.classList.remove(defauleClass);
                    }
                    this.classList.add(activeClass);
                    currentTabContent.style.display = "block";
                    for ( var i = tabItem.length - 1; i >= 0; i-- ) {
                        if ( tabItem[i].getAttribute("data-for") != dataFor ) {
                            tabItem[i].classList.remove(activeClass);
                            if ( defauleClass ) {
                                tabItem[i].classList.add(defauleClass);
                            }
                            document.getElementById(tabItem[i].getAttribute("data-for")).style.display = "none";
                        }
                    }
                } else {
                    return;
                }
            }, false);
        }
    }
    /*
     * 自动补齐
     * */
    jnjjApp.autoCompletion = function (opts) {
        var AutoCom = function () {
            this.url = opts.url;
            this.dom = opts.dom;
            this.data = opts.data;
            this.view = opts.view;
            this.updata = opts.updata;
            this.wrap = this.dom.parent();
            this.ulHtml = $('<ul class="sel"></ul>');
            this.init();
        };
        AutoCom.prototype = {
            "init"     : function () {//初始化
                var url = this.url;
                if ( this.updata ) {
                    this.wrap.find('ul').remove();
                    this.request(url);
                } else {
                    return;
                }
            },
            "request"  : function (url) { //请求数据
                var self = this;
                var data = this.data;
                if ( url !== null && url !== '' ) {
                    $.ajax({
                        type    : 'POST',
                        url     : url,
                        data    : data,
                        dataType: 'json'
                    }).done(function (data) {
                        if ( data.success ) {
                            var msg = data.msg;
                            self.view && self.renderSel(msg, self.view);
                            !self.view && self.renderSel(msg);//渲染下拉DOM
                            self.bindEvent();//绑定下拉条目数据
                        }
                    }).fail(function (msg) {
                        console.log('error!');
                    });
                } else {
                    console.log('模拟数据结束!!');
                }
            },
            "renderSel": function (data, view) { //渲染DOM
                console.dir(data);
                var dataVal,
                    value,
                    listArr = [],
                    listHtml,
                    dataSsxq;//所属辖区
                if ( view === 'T1' ) {
                    for ( var i = data.length - 1; i >= 0; i-- ) {
                        dataVal = data[i].wfxw;
                        value = data[i].wfms;
                        listArr.push('<li data-value=' + dataVal + '">' + dataVal + '(' + value + ')' + '</li>');
                    }
                } else {
                    for ( var i = data.length - 1; i >= 0; i-- ) {
                        dataVal = data[i].ddbh;
                        data[i].ssxq && (dataSsxq = data[i].ssxq);
                        value = data[i].ddmc;
                        listArr.push('<li data-ssxq=' + dataSsxq + ' data-value=' + dataVal + '>' + value + '</li>');
                    }
                }
                console.dir(listArr);
                listHtml = listArr.join('');
                this.ulHtml.html(listHtml);
                this.wrap.append(this.ulHtml);
                this.ulHtml.show();
            },
            "bindEvent": function () {  //事件绑定
                var self = this;
                var selUl = this.wrap.find('ul');
                var dataVal;
                var dataSsxq;
                selUl.on('click', 'li', function (event) {
                    event.stopPropagation();
                    var selVal = $(this).text();
                    dataVal = $(this).attr('data-value');
                    dataSsxq = $(this).attr('data-ssxq');
                    dataVal && self.dom.attr('data-value', dataVal);
                    dataSsxq && self.dom.attr('data-ssxq', dataVal);
                    self.dom.val(selVal);
                    self.ulHtml.hide();
                });
                $('body').on('click', function (event) {
                    if ( self.dom[0] !== event.target ) {
                        self.ulHtml.hide();
                    } else {
                        self.ulHtml.show();
                    }
                });
            }

        };
        new AutoCom();
    }
})();
console.log('debug info!');
