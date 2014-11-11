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
        xm;//姓名
    bh = document.getElementById('bh');
    dd = document.getElementById('dd');
    dz = document.getElementById('dz');
    dh = document.getElementById('dh');
    xm = document.getElementById('xm');
    var bmdm = jnjjApp.cookie.GetCookie("BuMenDaiMa");
    var name = jnjjApp.cookie.GetCookie("XingMing");
    var url ="/wispcms/adapter?url="
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
        console.log('请求数据失败!!');
    });
})();
