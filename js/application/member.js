var Member = new function __Member() {
    this.add = function (appid) {
        var email = $("#js-add-member-email").val();
        var role = $("#js-add-member-role").val();

        //send ajax add memeber
        TAMI.helper.ajax('.table', '/a/member/add', 'post', {app: appid, user: email, role: role}, function (data) {
            if (data.status == 200) {
                TAMI.reload();
            }
        });

    };


    this.changeRole = function (memberid, $selector) {
        var member = TAMI.find(TAMI.pagedata.members, memberid, function (e, id) {
            if (e.id == id) {
                return true;
            }
        });

        var role = TAMI.find(TAMI.pagedata.roles, $selector.val(), function (e, id) {
            if (e.value == id) {
                return true;
            }
        });

        if (!member || !role) {
            return;
        }

        if (member.role == role.value) {
            return;
        }

        if (member) {
            TAMI.confirm.show("Bổ nhiệm cho <b>" + member.user.name + "</b> vai trò là <b class='text-danger'>" + role.name + "</b>", function () {

                TAMI.helper.ajax('.table', '/a/member/' + role.value, 'post', {id: memberid}, function (data) {
                    $.log(data);
                });
            }, function () {
                $selector.val(member.role).trigger('change');
            });
        }
    };

    this.remove = function (memberid) {
        var member = TAMI.find(TAMI.pagedata.members, memberid, function (e, id) {
            if (e.id == id) {
                return true;
            }
        });

        if (!member) {
            return;
        }

        TAMI.confirm.show("Loại bỏ thành viên <b>" + member.user.name + "</b> ra khỏi ứng dụng này", function () {
            TAMI.helper.ajax('.table', '/a/member/remove', 'post', {id: memberid}, function (data) {
                if (data.status == 200) {
                    TAMI.reload();
                }
            });
        });
    };

    this.restore = function (memberid) {
        
        var member = TAMI.find(TAMI.pagedata.memdels, memberid, function (e, id) {
            if (e.id == id) {
                return true;
            }
        });

        if (!member) {
            return;
        }

        TAMI.confirm.show("Khôi phục thành viên <b>" + member.user.name + "</b>, cho phép tiếp tục sử dụng ứng dụng này", function () {
            TAMI.helper.ajax('.table', '/a/member/restore', 'post', {id: memberid}, function (data) {
                if (data.status == 200) {
                    TAMI.reload();
                }
            });
        });
    };
};