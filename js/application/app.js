var App = new function __App() {
    this.showAppLog = function (ref, appid) {
        var $btnloadmore = $('#js-app-loadmore');
        var start = parseInt($btnloadmore.data('start'));


        //get app logs
        TAMI.helper.ajax(ref, '/application/index/app-log/' + appid, 'POST', {start: start}, function (data) {
            var html = TAMI.render(data.data.logs, function (e) {

                return appLogHTML(e);
            });


            $(ref).append(html);

            //increment start
            $btnloadmore.data('start', start + 1);

            if (data.data.hideloadmore) {
                $btnloadmore.hide();
            }
        });

    };

    function appLogHTML(e) {
        return `<li>
                    <p>
                        ` + e.message + `
                        <span class="timeline-icon"><i class="fa  fa-edit"></i></span>
                        <span class="timeline-date">` + e.create_at + `</span>
                    </p>
                </li>`;
    }

    this.showMemeberLog = function (ref, appid) {
        var $btnloadmore = $('#js-member-loadmore');

        var start = parseInt($btnloadmore.data('start'));
        //get member logs
        TAMI.helper.ajax(ref, '/application/index/member-log/' + appid, 'POST', {start: start}, function (data) {
            var html = TAMI.render(data.data.logs, function (e) {

                return MemeberLogHTML(e);
            });


            $(ref).append(html);

            //increment start
            $btnloadmore.data('start', start + 1);

            if (data.data.hideloadmore) {
                $btnloadmore.hide();
            }
        });

    };

    function MemeberLogHTML(e) {
        return `<li>
                    <p>
                        ` + e.message + `
                        <span class="timeline-icon"><i class="fa fa-life-ring color-gray-light"></i></span>
                        <span class="timeline-date">` + e.create_at + `</span>
                    </p>
                </li>`;
    }
};