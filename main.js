(function(api, ui, parse, inject) {
  ui.mount(document.body);

  ui.attachSubmitListener(function(userInput) {
    var requestedLibraries = parse.parseUserInput(userInput);

    if (!requestedLibraries.length) {
      return ui.showError('Please enter some library names');
    }

    api.getCDNLibraryURLs(requestedLibraries, function(err, URLs) {
      if (err) {
        return ui.showError(err);
      }

      inject.injectScripts(URLs);
    });
  });
})();
