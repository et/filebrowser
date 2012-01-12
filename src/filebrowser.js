// **filebrowser** is a jQuery UI widget to manage file uploads from nodes
// Modified version of https://github.com/blueimp/jQuery-File-Upload


(function($, undefined){

  $.widget('faspex.filebrowser', {

    // # Options
    //
    //

    options: {
      // ### namespace `string`
      //
      // Sets the string to be used for the namespace
      namespace: undefined,

      // ### fileInput `string`
      //
      // The file input field collection that is listened to for change events.
      fileInput: undefined,

      // ### dropZone: `string`
      //
      // Set the string to be used for the drop target collection.
      // By default, the complete document
      dropZone: $(document),

      // ### add: `function`
      //
      // Callback to be run when files are added to the widget (input selection, drag & drop)
      // Override this!
      add: function (e, data) {
        alert("Override me!");
      }
    },

    // # Private methods
    //
    // ### `._create()`
    _create: function() {
      var options = this.options;
      options.namespace = options.namespace || this.widgetName;

      if (options.fileInput === undefined) {
        options.fileInput = this.element.is('input:file') ?
                this.element : this.element.find('input:file');
      }

      if (!options.dropZone) {
        options.dropZone = $();
      }

      this._initEventHandlers();
    },

    // ### `._initEventHandlers`
    _initEventHandlers: function () {
      var ns = this.options.namespace;

      this.options.dropZone
          .bind('dragover.' + ns, {filebrowser: this}, this._onDragOver)
          .bind('drop.'     + ns, {filebrowser: this}, this._onDrop);

      this.options.fileInput
          .bind('change.' + ns, {filebrowser: this}, this._onChange);

      console.dir(this.options.dropZone.data('events') );
    },

    // ### `._destroyEventHandlers`
    _destroyEventHandlers: function () {
      var ns = this.options.namespace;

      this.options.dropZone
          .unbind('dragover.' + ns, this._onDragOver)
          .unbind('drop.'     + ns, this._onDrop);

      this.options.fileInput
          .unbind('change.' + ns, this._onChange);
    },

    // ### onChange
    //
    // Triggered for fileInput
    _onChange: function (event) {

      var that = event.data.filebrowser,
          data = {
            files: $.makeArray(event.target.files)
          };

      if (!data.files.length) {
        // If the files property is not available, the browser does not
        // support the File API and we add a pseudo File object with
        // the input value as name with path information removed:
        data.files = [{name: event.target.value.replace(/^.*\\/, '')}];
      }

      if (that._onAdd(event, data) === false) {
        return false;
      }
    },

    // ### onDragOver
    //
    // Triggered for hovering files over dropZone.
    _onDragOver: function (event) {
      event.preventDefault();
    },

    // ### onDrop
    //
    // Triggered for dropping files into dropZone
    _onDrop: function (event) {
      var that         = event.data.filebrowser,
          dataTransfer = event.dataTransfer = event.originalEvent.dataTransfer,
          data         = {
            files: $.makeArray(dataTransfer && dataTransfer.files)
          };

      if (that._onAdd(event, data) === false) {
        return false;
      }

      event.preventDefault();
    },

    // ### _onAdd
    //
    // Triggered by the file input selection or drag & drop.
    _onAdd: function (event, data) {
      var that   = this,
          result = true;

      $.each ([data.files], function (index, element) {
        return (result = that._trigger('add', event, data));
      });

      return result;
    },

    // # Public methods
    //
    //

    // ### destroy `.filebrowser("destroy")`
    //
    // Removes the filebrowser instance from the DOM
    destroy: function() {
      this._destroyEventHandlers();
      $.Widget.prototype.destroy.call(this);
    }
  });
})(jQuery);
