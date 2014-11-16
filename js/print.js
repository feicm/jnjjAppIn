(function () {
    var curTime = jnjjApp.CurentTime('detail'),
        curTimeNormal = jnjjApp.CurentTime();
    var curTimeDom = document.getElementById('cur_time'),
        bottomTime = document.getElementById('b_time');
    curTimeDom.value = curTime;
    bottomTime.innerText = curTimeNormal;
    var bh,//编号
        dd,//大队
        dz,//地址
        dh,//电话
        xm,//姓名
        csys,//车身颜色
        cphm,//车牌号码
        cllx,//车牌类型
        wfdd;//违法地点
    bh = document.getElementById('bh');
    dd = document.getElementById('dd');
    dz = document.getElementById('dz');
    dh = document.getElementById('dh');
    xm = document.getElementById('xm');
    var bmdm = jnjjApp.cookie.GetCookie("BuMenDaiMa");
    var name = jnjjApp.cookie.GetCookie("XingMing");
    var url = "/wispcms/adapter?url="
        + jnjjApp.config.requestUrl
        + "/wisp_platform/platform/vioWfcl_viewVioWfcl.action";
    $.ajax({
        type    : 'POST',
        url     : url,
        data    : {wsbh: bmdm},
        dataType: 'json'
    }).done(function (data) {
        if ( data.success ) {
            var msg = data.msg;
            msg.wsbh && (bh.innerText = msg.wsbh);
            msg.wfclckmc && (dd.innerText = msg.wfclckmc);
            msg.wfcldz && (dz.innerText = msg.wfcldz);
            msg.wslxdh && (dh.innerText = msg.wslxdh);
            name && (xm.innerText = name);
        } else {
            console.log('数据返回错误！！！');
        }
    }).fail(function (msg) {
        console.log('请求数据失败!!' + msg);
    });
    var hphm = jnjjApp.cookie.GetCookie("HaoPaiHaoMa");
    var hpzl = jnjjApp.cookie.GetCookie("HaoPaiZhongLei");
    var wfddVal = jnjjApp.cookie.GetCookie("WeiFaDiDian");
    var oHpys = {
        "黄色": "08",
        "蓝色": "09",
        "黑色": "10",
        "其他": "11"
    };
    csys = document.getElementById('color');
    cphm = document.getElementById('num');
    hpzl && (cllx = document.getElementById("0" + hpzl));
    wfdd = document.getElementById('cur_add');
    if ( hphm && hpzl ) {
        var querycarUrl = "/wispcms/adapter?url="
            + jnjjApp.config.requestUrl
            + "/wisp_platform/platform/vehicle_viewVehicle.action";
        $.ajax({
            type    : 'POST',
            url     : querycarUrl,
            data    : {hpzl: hpzl, hphm: hphm, keyword: "json"},
            dataType: 'json'
        }).done(function (data) {
            if ( data.success ) {
                var msg = data.msg;
                cphm.value = hphm;//填充车牌号码
                msg.csys && (csys.value = msg.csys);//填充车身颜色
                cllx.checked = true;//填充车牌类型
                wfddVal && (wfdd.value = wfddVal);//填充违法地点
                msg.hpys && (document.getElementById(oHpys[msg.hpys]).checked = true);
            } else {
                console.log('数据返回错误！！！');
            }
        }).fail(function (msg) {
            console.log('请求数据失败!!' + msg);
        });
    }
})();
