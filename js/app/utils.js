define(['jquery'], function($) {

  function Utils(){ }

  Utils.prototype = {
    getParameterByName: function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    convertId : function(id){
      var converted;
      if (id.length === 17) {
          converted = id.substring(3) - 61197960265728;
      }
      else {
          converted = '765' + (id + 61197960265728);
      }
      return converted;
    }
  };

  return Utils;
});
