var Register = new function __Register() {

    this.validate = function (ref) {
        //validate fields
        return $(ref).validate({
            errorPlacement: function (error, element) {
                var place = element.closest('.input-group');
                if (!place.get(0)) {
                    place = element;
                }
                if (place.get(0).type === 'checkbox') {
                    place = element.parent();
                }
                if (error.text() !== '') {
                    place.after(error);
                }
            },
            errorClass: 'help-block',
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                username: {
                    required: true
                },
                password: {
                    required: true,
                    minlength: 5
                },
                password_2: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                }
            },
            messages: {
                first_name: {
                    required: "Thưa bạn, tôi cần biết tên của bạn"
                },
                last_name: {
                    required: "Thưa bạn, tôi cần biết họ của bạn"
                },
                email: {
                    required: "Thưa bạn, địa chỉ Email là bắt buộc",
                    email: "Địa chỉ Email không đúng định dạng"
                },
                username: {
                    required: "Thưa bạn, tên tài khoản là bắt buộc"
                },
                password: {
                    required: "Thưa bạn, Mật khẩu là bắt buộc",
                    minlength: "Độ dài mật khẩu ít nhất 5 ký tự"
                },
                password_2: {
                    required: "Thưa bạn, nhập lại mật khẩu là bắt buộc",
                    minlength: "Độ dài mật khẩu ít nhất 5 ký tự",
                    equalTo: "Mật khẩu xác nhận không giống mật khẩu đã nhập"
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