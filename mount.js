(function() {

  var CDNInjectorElement = window.CDNInjectorElement = document.createElement('div');

  CDNInjectorElement.style.display = 'block';

  CDNInjectorElement.innerHTML = '\
                   <p class="cdn-prompt">Enter libraries below in format \
                   &lt;name&gt;[@&lt;version&gt;], &lt;name&gt; ...</p>\
                   <p id="cdn-error" class="cdn-error"></p>\
                   <textarea style="display: block;" id="cdn-input" class="cdn-input"></textarea>\
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
