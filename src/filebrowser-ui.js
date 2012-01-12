(function ($) {
  'use strict';

  $.widget('faspexUI.filebrowser', $.faspex.filebrowser, {

    options: {

      // callback
      add: function (e, data) {
        var that  = $(this).data('filebrowser'),
            files = data.files;


        data.context = that._renderUpload(files)
            .appendTo(that._files)
            .data('data', data);
      }
    },

    _renderTemplate: function (func, files) {
      return func({ files: files });
    },

    _renderUpload: function (files) {
      var options = this.options;
      return this._renderTemplate(options.uploadTemplate, files);
    },

    _initTemplates: function () {
      this.options.uploadTemplate = function (o) {
        var rows = $();
        $.each(o.files, function (index, file) {
          var row = $('<tr class="template-upload">' +
                        '<td class="name"></td>'    +
                        '<td class="type"></td>'    +
                      '</tr>');
          row.find('.name').text(file.name);
          row.find('.type').text(file.type);

          rows = rows.add(row);
        });
        return rows;
      };
    },

    _create: function () {
      this._files = this.element.find('.files');
      $.faspex.filebrowser.prototype._create.call(this);
      this._initTemplates();
    }
  });
}(jQuery));
