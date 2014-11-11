$(function () {
    /*
     * 违法抓拍
     * */
    var Select1 = new jnjjApp.Select({//实例化下拉数据  --车牌类型
        "dom"     : $("#type"),
        "url"     : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/vehicle_carType.action",
        "dataType": 'Object'
    });
    var submit_btn = document.getElementById('submit_btn');
    jnjjApp.btnHover('submit_btn', 'btn-hover'); //提交按钮点击高亮
    jnjjApp.btnHover('reset', 'btn-hover');   //重置按钮点击高亮
    jnjjApp.btnHover('take_camera', 'camera-btn-hover'); //拍照“+”按钮点击高亮
    /*
     * 表单提交事件，分两部分：1、调用客户端上传图片；2、表单数据提交
     * */
    submit_btn.addEventListener('click', function (e) {
        var imgpath = jnjjApp.imgPath.join(',');//图片路径
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
    }, false);
    /*
     * 重置按钮事件绑定
     * */
    var reset_btn = $('#reset');
    var resetListener = function (e) {
        if ( confirm('重置所有内容将连照片也删除，确定？') ) {
            $('#type').val('01');
            $('#num').val('');
            $('#add').val('01');
            $('#action').val('');
            $('#phone_con').html('');
            jnjjApp.imgPath.length = 0;
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
        } else {
            return;
        }
    }
    add_input.on('keyup', function () {
        autoCompListener('add', url_add);
    });//按键提起时触发
    add_input.on('focus', function () {
        autoCompListener('add', url_add);
    });//获取焦点时触发
    action_input.on('keyup', function () {
        autoCompListener('action', url_action);
    });//按键提起时触发
    action_input.on('focus', function () {
        autoCompListener('action', url_action);
    });//获取焦点时触发
    /*
     * 拍照事件绑定
     * */
    var take_camera = document.getElementById('take_camera');
    if ( take_camera !== null ) { //拍照事件
        jnjjApp.imgPath = jnjjApp.imgPath || []; //保存照片路径
        var cameraListener = function (e) {//拍照事件函数
            if ( jnjjApp.imgPath.length < 3 ) {
                var Camera = new Wisp.ClientResource.Camera();
                Camera.open('jnjjApp.cameraCallback');//调用照相机  “jnjjApp.cameraCallback”客户端拍照回调函数
            } else {
                alert('只需拍摄三张照片！');
                return false;
            }
            take_camera.removeEventListener('click', cameraListener);
        }
        take_camera.addEventListener('click', cameraListener, false);
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
    }
    function submitForm(value) {
        var imgId = value,
            typeVal = $('#type').val() - 0,
            numVal = $('#num').val(),
            addVal = $('#add').val(),
            actionVal = $('#action').val();
        $.ajax({
            type    : 'POST',
            url     : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/wfscform_addWfscform.action",
            data    : {hpzl: typeVal, hphm: numVal, wfdd: addVal, wfxw: actionVal, wfscformid: imgId},
            dataType: 'json',
            success : function (data) {
                console.dir(data);
                if ( data !== null ) {
                    if ( data.success ) { //提交成功，重置表单
                        $('#type').val('02');
                        $('#num').val('');
                        $('#add').val('');
                        $('#action').val('');
                        $('#phone_con').html('');
                        //jnjjApp.PostFile.uploadSuccess();
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
	