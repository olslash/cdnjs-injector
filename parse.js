(function() {
  return {
    parseUserInput: function(input) {
      // jquery, underscore@1.2.1, backbone ->
      // [{
      //   name: 'jquery',
      //   version: null
      // }, {
      //   name: 'underscore',
      //   version: '1.2.1'
      // }, {
      //   name: 'backbone',
      //   version: null
      // }]

      return input.split(',')
        .map(function(lib) {
          var nameVer = lib.split('@');

          return {
            name:    nameVer[0].trim(),
            version: nameVer[1] || null
          };
        })
        .filter(function(obj) {
          return obj.name.length > 0;
        });
    }
  };
})();
