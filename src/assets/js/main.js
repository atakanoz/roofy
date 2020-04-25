/**
 * = Main JS
 *
 * Add your Custom JS Codes here and keep it clean.
 *
 * ========================================================================= */

// Define $ as Jquery
$ = jQuery;

$(function() {
  var scripts = {
    domManipulate: function(){
    },
    lazyload: function(){
    },
    carousels: function() {
    },
    init: function() {
      scripts.lazyload();
      scripts.carousels();
      scripts.domManipulate();
    }
  }
  $(function() {
    // Init all the scripts above
    scripts.init();
  });
});
