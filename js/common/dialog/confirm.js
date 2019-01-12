TAMI.confirm = new function __TAMIConfirm() {
    this.show = function (message, callbackok, callbackcancel) {
        bootbox.confirm({
            title: "Bạn chắc chắn muốn thực hiện hành động này ?",
            message: message,
            callback: function (result) {
                //callback result
                if (result) {
                    callbackok();
                } else {
                    if (typeof callbackcancel !== 'undefined') {
                        callbackcancel();
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