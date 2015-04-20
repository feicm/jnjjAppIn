$(function () {
    var clcxF = document.getElementById("clcx_f"),
        jzcxF = document.getElementById("jzcx_f"),
        wzcxF = document.getElementById("wzcx_f");
    var jybh = jnjjApp.cookie.GetCookie('JingYuanBianHao');
    //车辆查询
    if ( clcxF !== null ) {
        jnjjApp.btnHover('submit_btn_clcx', 'btn-hover');
        var Select = new jnjjApp.Select({
            "dom"     : $('#type'),
            "url"     : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/vehicle_carType.action&jybh=" + jybh,
            "dataType": 'Object',
            "callback": check
        });

        function check() {
            var submit_btn_clcx = $("#submit_btn_clcx"),
                form_clcx = document.getElementById('clcx_f');
            submit_btn_clcx.on('click', function () {
                var num = document.getElementById('num').value;
                if ( num !== '' ) {
                    var reg = /^[A-Z_a-z_0-9]{5}/;
                    if ( reg.test(num) ) {
                        form_clcx.submit();
                    } else {
                        alert('请输入正确的号牌号码！');
                    }
                } else {
                    alert("请输入号牌号码！");
                }
            })
        }
    }
    //驾照查询
    if ( jzcxF !== null ) {
        jnjjApp.btnHover('button', 'btn-hover');
        var Select = new jnjjApp.Select({
            "dom": $('#type'),
            "url": "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/drivinglicense_cardType.action&jybh=" + jybh
        });
        var qrcode = $('#qrcode');
        qrcode.hide();
        function QRcodeListener(btn, id) {
            Wisp.ClientResource.QRcode('open', {
                domId: id
            }, 'Wisp.ClientCallback.fillQRcodeText');
            btn.on('click', function () {
                QRcodeListener(btn, id);
            })
        }

        /* 身份证号 默认 3701 by chenruihong 2014-9-5 */
        $("#type").on('change', function (e) {
            var selectValue = document.getElementById("type").value;
            if ( selectValue == 1 || selectValue == 0 ) {
                qrcode.hide();
                qrcode.off('click');
                if ( selectValue == 1 ) {
                    document.getElementById("num").value = '3701';
                } else {
                    document.getElementById("num").value = '';
                }
            } else {
                qrcode.show();
                qrcode.on('click', function () {//调用二维码扫描并填充
                    var $this = $(this);
                    $this.off('click');
                    QRcodeListener($this, 'num');
                });
                document.getElementById("num").value = '';
            }

        })
    }
    //违章查询
    if ( wzcxF !== null ) {
        jnjjApp.btnHover('button', 'btn-hover');
        var Select = new jnjjApp.Select({
            "dom": $("#type-01"),
            "url": "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/vioViolation_wayType.action&jybh=" + jybh
        });
        var ini = function () {
            var selectValue = document.getElementById("type-01").value;
            if ( selectValue == 0 ) {
                document.getElementById("a1").style.display = "block";
                document.getElementById("a2").style.display = 'none';
                var Select = new jnjjApp.Select({
                    "dom"     : $("#hpzl"),
                    "url"     : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/vehicle_carType.action&jybh=" + jybh,
                    "dataType": 'Object'
                });
            }
            if ( selectValue == 1 ) {
                document.getElementById("a2").style.display = "block";
                document.getElementById("a1").style.display = "none";
                var Select = new jnjjApp.Select({
                    "dom": $("#zjlx"),
                    "url": "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/violation_cardType.action&jybh=" + jybh
                });
            }
        };
        $("#type-01").on('change', function (e) {
            var selectValue = document.getElementById("type-01").value;
            if ( selectValue == 0 ) {
                document.getElementById("a1").style.display = "block";
                document.getElementById("a2").style.display = 'none';
                var Select = new jnjjApp.Select({
                    "dom"     : $("#hpzl"),
                    "url"     : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/vehicle_carType.action&jybh=" + jybh,
                    "dataType": 'Object'
                });
            }
            if ( selectValue == 1 ) {
                document.getElementById("a2").style.display = "block";
                document.getElementById("a1").style.display = "none";
                var Select = new jnjjApp.Select({
                    "dom": $("#zjlx"),
                    "url": "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/violation_cardType.action&jybh=" + jybh
                });
            }
        })
        ini();
    }
});
	