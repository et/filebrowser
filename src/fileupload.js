// **fileupload** is a jQuery UI widget to manage file uploads from nodes


(function($, undefined){

  $.widget('faspex.fileupload', {

    // # Options
    //
    //

    options: {
      // ### namespace `string`
      //
      // Sets the string to be used for the namespace
      namespace: this.widgetName,

      // ### dropZone: `string`
      //
      // Set the string to be used for the drop target collection.
      // By default, the complete document
      dropZone: $(document)
    },

    // # Private methods
    //
    // ## `._create()`
    _create: function() {
    }
  });

      alert("CREATE");
})(jQuery);
