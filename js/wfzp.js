$(function () {
    /*
     * 违法抓拍
     * */
    var Select1 = new jnjjApp.Select({//实例化下拉数据  --车牌类型
        "dom"     : $("#type"),
        "url"     : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/vehicle_carType.action",
        "dataType": 'Object'
    });
    var submitBtn = $('#submit_btn');
    jnjjApp.btnHover('reset', 'btn-hover');   //重置按钮点击高亮
    jnjjApp.btnHover('take_camera', 'camera-btn-hover'); //拍照“+”按钮点击高亮
    /*
     * 打印按钮效果及事件
     * */
    var print_cb = $('#print');//print checkbox
    var go_print = $('#go_print'); //print btn
    print_cb.on('change', function (e) {
        var isCheck = $(this).attr('checked');
        console.log(isCheck);
        if ( isCheck ) {
            go_print.css('background', '#0C79BE');
            jnjjApp.btnHover('go_print', 'btn-hover');
            go_print.on('click', function (e) {
                printBtnListener();
            });
        } else {
            go_print.css('background', '#ddd');
            go_print.off('click');
        }
    });
    function printBtnListener() {
        //获取号牌种类 号牌号码 违法地点存入cookie ,并调用打印接口
        var hpzl, hphm, wfdd;
        hpzl = $('#type').val();
        hphm = $('#num').val();
        wfdd = $('#add').val();
        console.log(hpzl);
        console.log(hphm);
        console.log(wfdd);
        submitBtn.off('click');
        hpzl && jnjjApp.cookie.SetCookie('HaoPaiZhongLei', hpzl);
        hphm && jnjjApp.cookie.SetCookie('HaoPaiHaoMa', hphm);
        wfdd && jnjjApp.cookie.SetCookie('WeiFaDiDian', wfdd);
        Wisp.ClientResource.Printer("open", {
            "targetpage": 'config/html/print.html?action=print'
        });
        submitBtn.css('background', '#0C79BE');
        jnjjApp.btnHover('submit_btn', 'btn-hover'); //提交按钮点击高亮
        submitBtn.on('click', function (e) {
            submitBtnListener();
        });
    }

    /*
     * 表单提交事件，分两部分：1、调用客户端上传图片；2、表单数据提交
     * */
    function submitBtnListener(){
        var imgpath = jnjjApp.imgPath.join(','),//图片路径
            typeVal = $('#type').val() - 0,
            numVal = $('#num').val(),
            addVal = $('#add').val(),
            actionVal = $('#action').val();
        if ( jnjjApp.imgPath.length == 0 ) {
            alert('请先拍摄三张照片！')
        } else if ( jnjjApp.imgPath.length < 3 ) {
            alert('请先拍摄三张照片！')
        } else if ( typeVal === '' ) {
            alert('请选择车牌类型！')
        } else if ( numVal === '' ) {
            alert('请填写车牌号码！')
        } else if ( addVal === '' ) {
            alert('请填写违法地址')
        } else if ( actionVal === '' ) {
            alert('请填写违法行为')
        } else {//提交图片
            Wisp.UI.progressDialog.show('信息提交中，请稍后...');
            jnjjApp.PostFile = new Wisp.CommenFunc.PostFile({ //实例化上传接口对象
                "path"    : imgpath,
                "postUrl" : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/imageUpload.action",
                "callback": "jnjjApp.uploadfileCallback"
            });
            jnjjApp.PostFile.uploadFile();//调用上传函数
        }
    }
    /*
     * 重置按钮事件绑定
     * */
    var reset_btn = $('#reset');
    var resetListener = function (e) {
        if ( confirm('重置所有内容将连照片也删除，确定？') ) {
            var selectFirst=$("#type").find("option:first-child");
            $("#type_dummy").val(selectFirst.text());
            $('#type').val(selectFirst.val());
            $('#num').val('');
            $('#add').val('');
            $('#action').val('');
            $('#phone_con').html('');
            jnjjApp.imgPath.length = 0;
            print_cb.prop("checked",false);
            go_print.css('background', '#ddd');
            submitBtn.css('background', '#ddd');
            go_print.off('click');
            submitBtn.off('click');
        } else {
            return false;
        }
    };
    reset_btn.on('click', resetListener); //重置按钮事件注册
    var add_input = $('#add');
    var action_input = $('#action');
    var isUpdata = 1;//更新标识
    var oldValue; //保存上次值
    var Type;//保存上次事件对象————用id标识唯一行
    var bmdm = jnjjApp.cookie.GetCookie('BuMenDaiMa');
    var url_add = "/wispcms/adapter?url="
        + jnjjApp.config.requestUrl
        + "/wisp_platform/platform/wfddbh_listWfddbh.action";
    var url_action = "/wispcms/adapter?url="
        + jnjjApp.config.requestUrl
        + "/wisp_platform/platform/vioCodewfdm_listVioCodewfdm.action";
    var autoCompListener = function (type, url) {
        //console.log('发起联想请求');
        var dom = $('#' + type);
        var currVal = dom.val();
        oldValue !== currVal ? isUpdata = 1 : isUpdata = 0;
        if ( Type !== type ) {
            isUpdata = 1;
        }
        if ( isUpdata ) {
            switch ( type ) {
                case "add":
                    jnjjApp.autoCompletion({
                        "url"   : url,
                        "dom"   : dom,
                        "data"  : {bmdmt: bmdm, keyword: currVal},
                        "updata": true
                    });
                    break;
                case "action":
                    if ( currVal.length < 3 && currVal.length !== 0 ) return;
                    jnjjApp.autoCompletion({
                        "url"   : url,
                        "view"  : 'T1',
                        "dom"   : dom,
                        "data"  : {wfxw: currVal},
                        "updata": true
                    });
                    break;
            }
            Type = type;
            oldValue = currVal;
            isUpdata = 0;
        }
    };
    //含搜索按钮的input值变化触发函数
    function searchInputListener() {
        var s_btn = $(this).parent().find('.btn');
        var data_for = s_btn.attr('data-for');
        var isActive = s_btn.attr('active') || false;
        if ( $(this).val() ) {
            if ( isActive === 'true' ) return;//有值时仅第一次触发显示按钮和事件绑定
            s_btn.css('background', '#0C79BE');
            s_btn.attr('active', true);
            s_btn.on('click', function () {
                searchListener($(this), data_for);
            });
        } else {
            s_btn.css('background', '#ddd');
            s_btn.attr('active', false);
        }
    }

    //点击搜索事件函数
    function searchListener(dom, type) {
        var status = dom.attr('active');
        if ( status === 'true' ) {
            if ( type === 'add' ) {
                autoCompListener(type, url_add);
            }
            if ( type === 'action' ) {
                autoCompListener(type, url_action);
            }
        }
    }

    add_input.on('keyup', searchInputListener);//按键提起时触发
    action_input.on('keyup', searchInputListener);//按键提起时触发
    /*
     * 拍照事件绑定
     * */
    var take_camera_btn = document.getElementById('take_camera');
    if ( take_camera_btn !== null ) { //拍照事件
        jnjjApp.imgPath = jnjjApp.imgPath || []; //保存照片路径
        var cameraListener = function (e) {//拍照事件函数
            if ( jnjjApp.imgPath.length < 3 ) {
                var Camera = new Wisp.ClientResource.Camera();
                Camera.open('jnjjApp.cameraCallback');//调用照相机  “jnjjApp.cameraCallback”客户端拍照回调函数
            } else {
                alert('只需拍摄三张照片！');
                return false;
            }
            take_camera_btn.removeEventListener('click', cameraListener);
        };
        take_camera_btn.addEventListener('click', cameraListener, false);
    }
    /*
     * jnjjApp.uploadfileCallback 违法抓拍表单提交回调函数
     * @param  key 属性键名 eg:Result  ImageID
     * @param  value 属性值  eg:Success/Fail imageidValue
     * */
    jnjjApp.uploadfileCallback = function (key, value) { //提交表单数据
        switch ( key ) {
            case 'Result':
                if ( value === "Success" ) return;
                if ( value === "Fail" ) {
                    Wisp.UI.progressDialog.remove();
                    alert('提交失败！');
                }
                break;
            case 'ImageID':
                value !== '' ? submitForm(value) : console.log('ImageID不存在！！！'); //表单提交
                break;
        }
    };
    function submitForm(value) {
        var imgId = value,
            typeVal = $('#type').val(),//号牌种类  01
            numVal = $('#num').val(),//号牌号码  京A12345
            addVal = $('#add').attr('data-value'),//违法地点  208300315500
            actionVal = $('#action').attr('data-value'), //违法行为 12345
            ssxq = $('#add').attr('data-ssxq'), //采集机关（所属辖区）371600000001
            jybh = jnjjApp.cookie.GetCookie('49BAC005-7D5B-4231-8CEA-16939BEACD67');//警员编号 014903
        $.ajax({
            type    : 'POST',
            url     : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/wfscform_addWfscform.action",
            data    : {
                hpzl      : typeVal,
                hphm      : numVal,
                wfdd      : addVal,
                wfxw      : actionVal,
                cjjg      : ssxq,
                zqmj      : jybh,
                wfscformid: imgId
            },
            dataType: 'json',
            success : function (data) {
                console.dir(data);
                if ( data !== null ) {
                    if ( data.success ) { //提交成功，重置表单
                        var selectFirst=$("#type").find("option:first-child");
                        $("#type_dummy").val(selectFirst.text());
                        $('#type').val(selectFirst.val());
                        $('#num').val('');
                        $('#add').val('');
                        $('#action').val('');
                        $('#phone_con').html('');
                        print_cb.prop("checked",false);
                        go_print.css('background', '#ddd');
                        submitBtn.css('background', '#ddd');
                        go_print.off('click');
                        submitBtn.off('click');
                        Wisp.UI.progressDialog.remove();
                        alert('提交成功！！！');
                        jnjjApp.imgPath.length = 0;
                    } else {
                        //jnjjApp.PostFile.uploadFail();
                        Wisp.UI.progressDialog.remove();
                        alert('提交失败!');
                    }
                } else {
                    Wisp.UI.progressDialog.remove();
                    //jnjjApp.PostFile.uploadFail();
                    alert('提交失败!');
                }
            },
            error   : function (xhr, type) {
                //Wisp.UI.progressDialog.remove();
                //jnjjApp.PostFile.uploadFail();
                alert('提交失败!');
            }
        });
    }

    /*
     * 拍照回调函数
     * @param opts 回传照片路径，用户未保存时为空
     * */
    jnjjApp.cameraCallback = function (opts) {
        var args = Array.prototype.slice.apply(arguments);
        if ( opts ) {//用户有保存照片
            //alert('拍照成功!!文件路径：' + args[0]);
            jnjjApp.imgPath = jnjjApp.imgPath || []; //保存照片路径
            jnjjApp.imgPath.length === 3 ? jnjjApp.imgPath = [] : true;
            jnjjApp.imgPath.push(args[0]);
            var index = jnjjApp.imgPath.length;
            var html = '<a data-for="' + jnjjApp.imgPath[index - 1] + '">' +
                '<img src="' + jnjjApp.imgPath[index - 1] + '@imgsrc@"></br>' +
                '<em>已拍照片</em>' +
                '</a>';
            $('#phone_con').append(html);
            var imgListener = function () {
                var self = $(this),
                    dataFor = $(this).attr('data-for'),
                    l = jnjjApp.imgPath.length;
                if ( confirm('确定要删除照片？') ) {
                    $(this).remove();
                    for ( var i = l; i > 0; i-- ) {
                        jnjjApp.imgPath[i - 1] === dataFor ? jnjjApp.imgPath.splice(i - 1, 1) : 0;
                    }
                }
                self.off('click');//移除事件再注册事件，解决事件多次绑定问题
                self.on('click', imgListener);
            };
            $('#phone_con a').on('click', imgListener);
            take_camera.addEventListener('click', cameraListener, false);
        } else {//用户未保存照片直接返回
            take_camera.addEventListener('click', cameraListener, false);
        }
    };
});
	