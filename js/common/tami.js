var TAMI = new function __TAMI() {
    this.redirect = function (url) {
        $(location).attr('href', url);
    };

    this.reload = function () {
        window.location.reload();
    };


    this.select = function (arr, callback) {
        var array = [];
        if (arr) {
            var length = arr.length;

            for (var i = 0; i < length; i++) {
                array.push(callback(arr[i], i));

            }
        }
        return array;
    };

    this.render = function (arr, callback) {
        var html = '';
        if (arr) {
            var length = arr.length;

            for (var i = 0; i < length; i++) {
                html = html + callback(arr[i], i);

            }
        }

        return html;
    };


    this.find = function (arr, id, callback) {

        if (arr) {
            var length = arr.length;

            for (var i = 0; i < length; i++) {

                if (callback(arr[i], id) === true) {
                    return arr[i];
                }

            }
        }
        return null;
    };
};

