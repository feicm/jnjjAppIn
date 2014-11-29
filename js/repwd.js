(function () {
    var repwdbtn = document.getElementById('pwd-submit');
    var jybh=jnjjApp.cookie.GetCookie('JingYuanBianHao');
    if ( repwdbtn !== null ) {
        var repwdListener = function () {
            var oldpwd,
                newpwd,
                confirmpwd,
                self = this;
            oldpwd = document.getElementById('oldpwd').value;
            newpwd = document.getElementById('newpwd').value;
            confirmpwd = document.getElementById('confirmpwd').value;
            var reg01 = /[a-zA-Z]+/,
                reg02 = /\d+/,
                reg03 = /\W+/;
            self.removeEventListener('click', repwdListener, false);
            if ( oldpwd === '' ) {
                alert('原密码不能为空！');
                repwdbtn.addEventListener('click', repwdListener, false);
            } else {
                if ( newpwd === '' ) {
                    alert('新密码不能为空！');
                    repwdbtn.addEventListener('click', repwdListener, false);
                } else if ( newpwd.length < 6 ) {
                    alert("长度不能少于6!");
                    repwdbtn.addEventListener('click', repwdListener, false);
                } else if ( !reg01.test(newpwd) ) {
                    alert("至少要包含一个字母!");
                    repwdbtn.addEventListener('click', repwdListener, false);
                } else if ( !reg02.test(newpwd) ) {
                    alert("至少要包含一个数字!");
                    repwdbtn.addEventListener('click', repwdListener, false);
                } else if ( reg03.test(newpwd) ) {
                    alert("新密码只允许包含字母和数字!");
                    repwdbtn.addEventListener('click', repwdListener, false);
                } else if ( confirmpwd !== newpwd ) {
                    alert('两次输入密码不一致！');
                    repwdbtn.addEventListener('click', repwdListener, false)
                } else {
                    $.ajax({
                        type    : 'POST',
                        url     : "adapter?open&url=" + jnjjApp.config.requestUrl + "/wisp_platform/platform/modifypwd.action",
                        // data to be added to query string:
                        data    : { 'pname': jybh, oldpwd: oldpwd, newpwd: newpwd, confirmpwd: confirmpwd },
                        // type of data we are expecting in return:
                        dataType: 'json',
                        success : function (data) {
                            var success = data.success;
                            if ( success ) {
                                alert('密码修改成功！');
                                repwdbtn.addEventListener('click', repwdListener, false);
                                document.getElementById('oldpwd').value = '';
                                document.getElementById('newpwd').value = '';
                                document.getElementById('confirmpwd').value = '';
                            } else {
                                if(data.msg==='ERROR_CONFIRM_PASSWORD') alert('两次密码输入不一致！');
                                if(data.msg==='ERROR_OLD_PASSWORD') alert('原密码错误！');
                                if(data.msg==='ERROR_NEW_PASSWORD') alert('新密码只允许包含字母和数字！');
                                if(data.msg==='ERROR_NULL_PARAM') alert('密码修改失败！');
                                repwdbtn.addEventListener('click', repwdListener, false)
                            }
                        },
                        error   : function (xhr, type) {
                            alert('修改密码失败!请检查是否输入正确！');
                            repwdbtn.addEventListener('click', repwdListener, false)
                        }
                    });
                }
            }
        }
        repwdbtn.addEventListener('click', repwdListener, false);
    }
})();
	