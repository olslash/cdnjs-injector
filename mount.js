(function() {
  var elt = window.CDNInjectorElement = document.createElement('div');

  elt.innerHTML = '<span class="cdn-prompt">Enter libraries below in format <name>[@<version>], <name> ...</span>\
                   <span id="cdn-error" class="cdn-error"></span>\
                   <textarea id="cdn-input" class="cdn-input"></textarea>\
                   <button id="cdn-submit">Fetch libraries</button>\
                   ';

  elt.showError = function(errMsg) {
    var text = document.createTextNode(errMsg);
    var errorElt = elt.querySelector('#cdn-error');
    errorElt.innerHTML = '';
    errorElt.appendChild(text);
  };

  elt.handleSubmit = function(callback) {
    var input = elt.querySelector('#cdn-input');
    var button = elt.querySelector('#cdn-submit');

    button.addEventListener('click', function(event) {
      callback(input.value);
      // Will destroy input value even if submission fails.
      // Possible improvement would use success/failure handlers.
      input.value = '';
    });
  };

  if (document.body.hasChildNodes()) {
    document.body.insertBefore(elt, document.body.firstChild);
  } else {
    document.appendChild(elt);
  }

})();
