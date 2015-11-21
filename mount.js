(function() {

  var CDNInjectorElement = window.CDNInjectorElement = document.createElement('div');

  CDNInjectorElement.innerHTML = '<span class="cdn-prompt">Enter libraries below in format <name>[@<version>], <name> ...</span>\
                   <span id="cdn-error" class="cdn-error"></span>\
                   <textarea id="cdn-input" class="cdn-input"></textarea>\
                   <button id="cdn-submit">Fetch libraries</button>\
                   ';

  CDNInjectorElement.showError = function(errMsg) {
    var text = document.createTextNode(errMsg);
    var errorElt = CDNInjectorElement.querySelector('#cdn-error');
    errorElt.innerHTML = '';
    errorElt.appendChild(text);
  };

  CDNInjectorElement.handleSubmit = function(callback) {
    var input = CDNInjectorElement.querySelector('#cdn-input');
    var button = CDNInjectorElement.querySelector('#cdn-submit');

    button.addEventListener('click', function(event) {
      if (input.value === '') return;

      callback(input.value);
      // Will destroy input value even if submission fails.
      // Possible improvement would use success/failure handlers.
      input.value = '';
    });
  };

  CDNInjectorElement.mount = function(element) {
    if (element.hasChildNodes()) {
      element.insertBefore(CDNInjectorElement, element.firstChild)
    } else {
      element.appendChild(CDNInjectorElement);
    }
  };

  CDNInjectorElement.unmount = function() {
    CDNInjectorElement.remove();
  };

})();
