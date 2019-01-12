TAMI.helper = new function __Helper() {
    this.autoComplete = function (ref, url, options) {
        $(ref).autocomplete({
            source: function (request, response) {
                $.post(url, {searchText: request.term}, function (data) {
                    response($.map(data.data.users, function (item) {
                        return item;
                    }));
                });
            },
            focus: function (event, ui) {
                return  options.focus(event, ui);
            },
            select: function (event, ui) {
                return  options.select(event, ui);
            },
            minLength: 2,
            delay: 100,
            create: function () {
                $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
                    return $('<li class="li-autocomplete">')
                            .append(options.render(item))
                            .appendTo(ul);
                };
            }
        });
    };

    this.ajax = function (ref, url, method, data, callback) {
        TAMI.waitme.show(ref);

        //add tami code 
        if (typeof data == 'object') {
            data['__TAMI_CODE'] = TAMI.pagedata.__TAMI_CODE;
        } else {
            data = data + '&__TAMI_CODE=' + TAMI.pagedata.__TAMI_CODE;
        }

        $.ajax({
            type: method,
            url: url,
            data: data, // serializes the form's elements.
            success: function (data)
            {
                TAMI.waitme.hide(ref);
                if (data.status != 200) {
                    return TAMI.alert.error(data.message);
                }

                //callback
                callback(data);
            }
        });

    };
};
