var AssignmentMember = new function __AssignmentMember() {

    this.toggleRole = function (memberid, roleid) {
        TAMI.helper.ajax('.assignment', '/assignment/member/has-role', 'POST', {member_id: memberid, role_id: roleid}, function (data) {

            //hasrole
            if (data.data.status != false) {

                TAMI.confirm.show("Thực hiện <b>hủy bỏ</b> vai trò của thành viên này", function () {
                    TAMI.helper.ajax('.assignment', '/assignment/member/remove-role', 'POST', {member_id: memberid, role_id: roleid}, function (data) {
                        AssignmentMember.showIndexLog('#js-member-activitys', TAMI.pagedata.appid);
                    });
                });

            } else { //else
                TAMI.confirm.show("Thực hiện <b>bổ nhiệm</b> vai trò cho thành viên này", function () {
                    TAMI.helper.ajax('.assignment', '/assignment/member/add-role', 'POST', {member_id: memberid, role_id: roleid}, function (data) {
                        AssignmentMember.showIndexLog('#js-member-activitys', TAMI.pagedata.appid);
                    });
                });
            }

        });
    };

    this.showIndexLog = function (ref, appid) {
        var $btnloadmore = $('#js-member-loadmore');
        var start = parseInt($btnloadmore.data('start'));


        //get app logs
        TAMI.helper.ajax(ref, '/assignment/member/index-log/' + appid, 'POST', {start: start}, function (data) {
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