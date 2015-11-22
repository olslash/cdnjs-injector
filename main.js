var api = require('./api');
var ui = require('./ui');
var parse = require('./parse');
var inject = require('./inject');


(function main() {
  ui.mount(document.body);

  ui.attachSubmitListener(function(userInput) {
    if (!userInput.length) {
      return ui.showMessage('Please enter some library names');
    }

    var requestedLibraries = parse.parseUserInput(userInput);

    api.getCDNLibraryURLs(requestedLibraries, function(err, URLs) {
      if (err) {
        return ui.showMessage(err);
      }

      inject.injectScripts(URLs);

      setTimeout(function() {
        ui.unmount();
      }, 1000);
    });
  });
})();
