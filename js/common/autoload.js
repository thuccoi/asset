$.log = function () {
    if (ENV.development == 1) {

        var arr = [];
        for (var i = 0; i < arguments.length; i++) {
            arr.push(arguments[i]);
        }

        //show arr
        if (arguments.length > 1) {
            console.log(arr);
        } else {
            console.log(arr[0]);
        }
    }
};

function require(pathjs) {

    $.ajax({
        url: pathjs,
        dataType: "script",
        async: false, // <-- This is the key
        success: function () {
            // all good...
        },
        error: function () {
            throw new Error("Could not load script " + pathjs);
        }
    });
}


//tami
require('/tami/js/common/tami.js');

//autoload
require('/tami/resource/autoload.js');

//helper
require('/tami/js/common/helper.js');

//dialog
require('/tami/js/common/dialog/alert.js');
require('/tami/js/common/dialog/confirm.js');

//process
require('/tami/js/common/process/waitme.js');

//form
require('/tami/js/common/form/form.js');