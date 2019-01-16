var Login = new function __Login() {

    this.validate = function (ref) {
        return $(ref).validate({
            errorPlacement: function (error, element) {
                var place = element.closest('.input-group');
                if (!place.get(0)) {
                    place = element;
                }

                if (place.get(0).type == 'checkbox') {
                    place = element.parent();
                }

                if (error.text() !== '') {
                    place.after(error);
                }
            },
            errorClass: 'help-block',
            rules: {
                email: {
                    required: true
                },
                password: {
                    required: true,
                    minlength: 5
                }
            },
            messages: {
                email: {
                    required: "Tên tài khoản hoặc email được yêu cầu"
                },
                password: {
                    required: "Mật khẩu đăng nhập được yêu cầu",
                    minlength: "Độ dài mật khẩu phải từ 5 ký tự trở lên"
                }
            },
            highlight: function (label) {
                $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            success: function (label) {
                $(label).closest('.form-group').removeClass('has-error');
                label.remove();
            }
        });
    };
};