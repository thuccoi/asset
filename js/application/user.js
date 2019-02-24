var User = new function __User() {
    this.delete = function (id, name) {
        TAMI.confirm.show('Cấm hoạt động người dùng <b class="text-danger">' + name + '</b>, khi hành động này được thực hiện thì người dùng sẽ không thể đăng nhập và sử dụng bất kỳ một ứng dụng nào của bạn nữa.', function () {
            TAMI.helper.ajax('#js-list-user-table', '/application/user/delete', 'POST', {id: id}, function (data) {
                if (data.status == 200) {
                    TAMI.reload();
                }
            });
        });
    };

    this.restore = function (id, name) {
        TAMI.confirm.show('Khôi phục lại tài khoản người dùng <b class="text-danger">' + name + '</b>, khi hành động này được thực hiện thì người dùng này sẽ được sử dụng lại những ứng dụng trước đó đã được sử dụng.', function () {
            TAMI.helper.ajax('#js-list-user-table', '/application/user/restore', 'POST', {id: id}, function (data) {
                if (data.status == 200) {
                    TAMI.reload();
                }
            });
        });
    };
};