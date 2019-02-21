var AssignmentMember = new function __AssignmentMember() {

    this.toggleRole = function (memberid, roleid) {
        TAMI.helper.ajax('.assignment', '/assignment/member/has-role', 'POST', {member_id: memberid, role_id: roleid}, function (data) {

            //hasrole
            if (data.data.status != false) {

                TAMI.confirm.show("Thực hiện <b>hủy bỏ</b> vai trò của thành viên này", function () {
                    TAMI.helper.ajax('.assignment', '/assignment/member/remove-role', 'POST', {member_id: memberid, role_id: roleid}, function (data) {
                    });
                });

            } else { //else
                TAMI.confirm.show("Thực hiện <b>bổ nhiệm</b> vai trò cho thành viên này", function () {
                    TAMI.helper.ajax('.assignment', '/assignment/member/add-role', 'POST', {member_id: memberid, role_id: roleid}, function (data) {
                    });
                });
            }

        });
    };

};