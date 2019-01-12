TAMI.alert = new function __TAMIAlert() {
    this.error = function (message, callback) {
        this.show(message, "Lỗi xảy ra", "Tôi đã biết", "danger", callback);
    };

    this.success = function (message, callback) {
        this.show(message, "Thành công", "Tôi đã biết", "success", callback);
    };

    this.show = function (message, title, label, type, callback) {
        if (typeof type == 'undefined') {
            type = 'primary';
        }

        if (typeof label == 'undefined') {
            label = 'Ok i got it';
        }


        if (typeof title == 'undefined') {
            title = 'Alert';
        }

        bootbox.dialog({
            message: message,
            title: title,
            buttons: {
                success: {
                    label: label,
                    className: "btn-" + type + " btn-alt",
                    callback: function () {
                        if (typeof callback !== 'undefined') {
                            callback();
                        }
                    }
                }
            }
        });

        $('body').find('.modal-dialog').addClass('modal-dialog-center').css({
            'margin-top': function () {
                return -($(this).outerHeight() / 2) - 100;
            },
            'margin-left': function () {
                return -($(this).outerWidth() / 2);
            }
        });
    };
};