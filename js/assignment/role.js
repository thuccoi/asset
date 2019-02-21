var AssignmentRole = new function __AssignmentRole() {
    this.togglePermission = function (permission, roleid) {
        TAMI.helper.ajax('.assignment', '/assignment/role/has-permission', 'POST', {permission: permission, role_id: roleid}, function (data) {

            //hasrole
            if (data.data.status != false) {

                TAMI.confirm.show("Thực hiện <b>hủy bỏ</b> quyền hạn của vai trò này", function () {
                    TAMI.helper.ajax('.tbpermission', '/assignment/role/remove-permission', 'POST', {permission: permission, role_id: roleid}, function (data) {
                        AssignmentRole.showPermissionLog('#js-permission-activitys', TAMI.pagedata.appid);
                    });
                });

            } else { //else
                TAMI.confirm.show("Thực hiện <b>giao quyền</b> cho vai trò này", function () {
                    TAMI.helper.ajax('.tbpermission', '/assignment/role/add-permission', 'POST', {permission: permission, role_id: roleid}, function (data) {
                        AssignmentRole.showPermissionLog('#js-permission-activitys', TAMI.pagedata.appid);
                    });
                });
            }

        });
    };

    this.showEditLog = function (ref, roleid) {
        var $btnloadmore = $('#js-role-loadmore');
        var start = parseInt($btnloadmore.data('start'));


        //get app logs
        TAMI.helper.ajax(ref, '/assignment/role/edit-log/' + roleid, 'POST', {start: start}, function (data) {
            var html = TAMI.render(data.data.logs, function (e) {

                return logHTML(e);
            });


            $(ref).append(html);

            //increment start
            $btnloadmore.data('start', start + 1);

            if (data.data.hideloadmore) {
                $btnloadmore.hide();
            }
        });

    };

    this.showIndexLog = function (ref, appid) {
        var $btnloadmore = $('#js-role-loadmore');
        var start = parseInt($btnloadmore.data('start'));


        //get app logs
        TAMI.helper.ajax(ref, '/assignment/role/index-log/' + appid, 'POST', {start: start}, function (data) {
            var html = TAMI.render(data.data.logs, function (e) {

                return logHTML(e);
            });


            $(ref).append(html);

            //increment start
            $btnloadmore.data('start', start + 1);

            if (data.data.hideloadmore) {
                $btnloadmore.hide();
            }
        });

    };

    this.showPermissionLog = function (ref, appid) {
        var $btnloadmore = $('#js-permission-loadmore');
        var start = parseInt($btnloadmore.data('start'));

        //get app logs
        TAMI.helper.ajax(ref, '/assignment/role/permission-log/' + appid, 'POST', {start: start}, function (data) {
            var html = TAMI.render(data.data.logs, function (e) {

                return logHTML(e);
            });


            $(ref).append(html);

            //increment start
            $btnloadmore.data('start', start + 1);

            if (data.data.hideloadmore) {
                $btnloadmore.hide();
            }
        });

    };

    this.showCreateLog = function (ref, appid) {
        var $btnloadmore = $('#js-role-loadmore');
        var start = parseInt($btnloadmore.data('start'));


        //get app logs
        TAMI.helper.ajax(ref, '/assignment/role/create-log/' + appid, 'POST', {start: start}, function (data) {
            var html = TAMI.render(data.data.logs, function (e) {

                return logHTML(e);
            });


            $(ref).append(html);

            //increment start
            $btnloadmore.data('start', start + 1);

            if (data.data.hideloadmore) {
                $btnloadmore.hide();
            }
        });

    };

    function logHTML(e) {
        return `<li>
                    <p>
                        ` + e.message + `
                        <span class="timeline-icon"><i class="fa  fa-edit"></i></span>
                        <span class="timeline-date">` + e.create_at + `</span>
                    </p>
                </li>`;
    }

};