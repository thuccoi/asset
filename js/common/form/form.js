TAMI.form = new function __TAMIForm() {
  this.__html = '';
  this.__elemId = '#__TAMI_FORM_ID_' + TAMI.helper.random();

  this.init = function (title, options) {
    if($(this.__elemId).length){
      this.close();
    }
    
    $('body').append(`<div id="${this.__elemId}"></div>`);
    //add title
    this.layout.title(title);
  };
  
  this.show = function () {

    $(this.__elemId).show();

    return this;
  };

  this.close = function () {
    $(this.__elemId).hide();
    $(this.__elemId).remove();
    return this;
  };

};

//autoload components of form
require('/tami/js/common/form/action.js');
require('/tami/js/common/form/button.js');
require('/tami/js/common/form/input.js');
require('/tami/js/common/form/layout.js');
require('/tami/js/common/form/row.js');

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
