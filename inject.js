(function() {
  var CDN_URL = 'https://api.cdnjs.com/libraries';

  function searchCDN(libs, cb) {
    // if search includes a version for a particular library, that library's call should
    // include &fields=assets, then search results[0].assets for version: x.x.x
    // otherwise take results[0].latest
    var results = [];
    libs.forEach(function(option) {
      var query = {
        search: option.name,
        fields: option.version ? 'assets' : null
      };

      get(CDN_URL, query, function(err, res) {
        var results = res.results;
        if (err || results.length === 0) {
          // handle failure
        }

        var libraryScriptURL;
        if (option.version) {
          var lib = findWhere(results[0].assets, function (asset) {
            return asset.version === option.version;
          });
        } else {
          libraryScriptURL = results[0].latest
        }

        results.push('etc');

        if (results.length === libs.length) {
          cb(null, results);
        }
      });
    });


  }

  function parseApiResponse(res) {

  }

  function parseUserInput(input) {
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

  function getVersionedURL(anyVersionURL, version) {
    // second-from-last index of anyVersionURL.split('/') should be the version. splice it in.
  }

  function get(url, data, cb) {
    var request = new XMLHttpRequest();
    request.open('GET', url + '?' + encodeQueryData(data), true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        cb(null, request);
      } else {
        cb('API error');
      }
    };

    request.onerror = function() {
      cb('API error');
    };

    request.send();
  }

  function encodeQueryData(data) {
    return Object.keys(data).map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join('&');
  }

  function findWhere(array, pred) {
    for(var i = 0, len = array.length; i < len; i++) {
      var val = array[i];
      if (pred(val)) {
        return val;
      }
    }

    return null;
  }
})();
