TAMI.waitme = new function __TAMIWaitme() {
    this.show = function (ref) {
        $(ref).waitMe({
            effect: 'rotateplane',
            text: '',
            bg: 'rgba(255,255,255,0.7)',
            color: '#616469',
            /* sizeW : '32',
             sizeH : '32'*/
        });

    };

    this.hide = function (ref) {
        $(ref).waitMe("hide");
    };
};