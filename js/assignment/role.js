var Role = new function __Role() {
    this.showLog = function (ref, appid) {
        var $btnloadmore = $('#js-role-loadmore');
        var start = parseInt($btnloadmore.data('start'));


        //get app logs
        TAMI.helper.ajax(ref, '/assignment/role/log/' + appid, 'POST', {start: start}, function (data) {
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