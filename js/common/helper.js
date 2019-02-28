TAMI.helper = new function __Helper() {
    this.autoComplete = function (ref, url, options) {
        $(ref).autocomplete({
            source: function (request, response) {
                TAMI.helper.ajax(ref, url, 'POST', {searchText: request.term}, function (data) {
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
            data['__TAMI_FROM_AJAX'] = 1;
        } else {
            data = data + '&__TAMI_CODE=' + TAMI.pagedata.__TAMI_CODE;
            data = data + '&__TAMI_FROM_AJAX=1';
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


//search tags member
$(".__TAMI_TAG_MEMBER").each(function () {
    var refmember = '#' + $(this).attr('id');
    var urlmember = $(this).attr('url');
    TAMI.helper.autoComplete(refmember, urlmember, {
        focus: function (event, ui) {
            $(refmember).val(ui.item.email);
            return false;
        },
        select: function (event, ui) {
            $(refmember).val(ui.item.email);
            return false;
        },
        render: function (item) {
            return `<a class="a-autocomplete"> 
                        <img class="image" src="/static/img/avatars/` + (Math.floor(Math.random() * 10) + 1) + `.jpg"> 
                        <div class="txt">
                            <div class="name">
                                ` + item.first_name + ' ' + item.last_name + ` (` + item.username + `)
                            </div>     
                            <div class="email">
                                ` + item.email + `
                            </div>
                        </div>
                    </a>`;
        }
    });
});
