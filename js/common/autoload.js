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
require('/js/common/tami.js');

//autoload
require('/resource/autoload.js');

//helper
require('/js/common/helper.js');

//dialog
require('/js/common/dialog/alert.js');
require('/js/common/dialog/confirm.js');

//process
require('/js/common/process/waitme.js');

//form
require('/js/common/form/form.js');