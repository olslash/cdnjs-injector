// todo: show what libs will be loaded + confirm button. In case first search result isn't the right thing.

var CDN_API_URL = 'https://api.cdnjs.com/libraries';
var CDN_SCRIPT_BASEURL = 'https://cdnjs.cloudflare.com/ajax/libs/';

function getCDNLibraryURLs(libs, cb) {
  var queries = libs.map(function(option) {
    return {
      search: option.name,
      fields: option.version ? 'assets' : null,
      version: option.version // attaches useless version param but convenient later
    };
  });

  asyncMap(queries, function(query, done) {
    get(CDN_API_URL, query, function(err, res) {
      if (err) {
        return done('API error: ' + err);
      }

      var results = JSON.parse(res.responseText).results;

      if (results.length === 0) {
        return done('No results found for ' + query.search);
      }

      var libraryScriptURL;
      if (query.version) {
        var versionExists = results[0].assets.some(function(asset) {
          return asset.version === query.version;
        });

        if (!versionExists) {
          return done('The version specified for ' + query.search + ' (' + query.version + ') does not exist.');
        }

        libraryScriptURL = getVersionedCDNURL(results[0].name, query.version, extractFilename(results[0].latest));
      } else {
        libraryScriptURL = results[0].latest;
      }

      done(null, libraryScriptURL);
    });
  }, cb);
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

function getVersionedCDNURL(libName, version, fileName) {
  return CDN_SCRIPT_BASEURL + libName + '/' + version + '/' + fileName;
}

function extractFilename(url) {
  var segments = url.split('/');
  return segments[segments.length - 1];
}

// modified async-each MIT license (by Paul Miller from http://paulmillr.com).
function asyncMap(items, iterator, callback) {
  if (items.length === 0) return callback(undefined, items);

  var transformed = new Array(items.length);
  var count = 0;
  var returned = false;

  items.forEach(function(item, index) {
    iterator(item, function(error, transformedItem) {
      if (returned) {
        return null;
      }

      if (error) {
        returned = true;
        return callback(error);
      }

      transformed[index] = transformedItem;
      count += 1;
      if (count === items.length) {
        return callback(undefined, transformed);
      }
    });
  });
}

module.exports = {
  getCDNLibraryURLs: getCDNLibraryURLs
};
