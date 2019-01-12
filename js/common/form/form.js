TAMI.form = new function __TAMIForm() {

};


$(document).ready(function () {

    // this is the id of the form
    $("form").submit(function (e) {
        var form = $(this);
        var url = form.attr('action');

        var type = form.attr('method');
        if (typeof type === 'undefined' || !type) {
            type = 'POST';
        }

        //to url after finished
        var tourl = form.attr('tourl');

        TAMI.helper.ajax(form, url, type, form.serialize(), function (data) {
            
            //check tourl
            if (data.tourl) {
                tourl = data.tourl;
            } else {
                //check mesdone
                var mesdone = form.attr('mesdone');
                if (mesdone == "on") {

                    var variable = '';

                    Object.keys(data).forEach(function (key) {
                        variable = variable + '&' + key + '=' + data[key];
                    });

                    //add variable to url
                    if (tourl.indexOf('?') == -1) {
                        tourl = tourl + '?';
                        if (variable) {
                            variable = variable.substring(1);
                        }
                    }

                    tourl = tourl + variable;
                }
            }

            TAMI.redirect(tourl);
        });

        e.preventDefault(); // avoid to execute the actual submit of the form.
    });
});
