var CDNInjectorElement = document.createElement('iframe');

CDNInjectorElement.className = 'cdn-injector-container';

var CDNStylesElement = document.createElement('style');

CDNInjectorElement.srcdoc =
  '<div id="cdn-injector-close">x</div>' +
  '<p class="cdn-injector-prompt">' +
    'Enter libraries below in the format<br>' +
    '&lt;name&gt;[@&lt;version&gt;], &lt;name&gt; ...' +
  '</p>' +
  '<p id="cdn-injector-error" class="cdn-injector-error"></p>' +
  '<textarea id="cdn-injector-input" class="cdn-injector-input"></textarea>' +
  '<button id="cdn-injector-submit">Fetch libraries</button>';

CDNStylesElement.innerHTML =
  '.cdn-injector-container {' +
                  'display: block;' +
                  'position: fixed;' +
                  'left: 0;' +
                  'right: 0;' +
                  'margin-left: auto;' +
                  'margin-right: auto;' +
                  'color: white;' +
                  'background-color: #AAA;' +
                  'border-radius: 5px;' +
                  'max-width: 300px;' +
                  'padding: 10px;' +
                  'text-align: center;' +
                  'z-index: 9999;' +
                '}' +
  '.cdn-injector-input {' +
                  'display: block;' +
                  'margin: 10px auto 10px auto;' +
                '}' +
  '#cdn-injector-close {' +
                  'cursor: pointer;' +
                  'position: absolute;' +
                  'right: 20px;' +
                '}';

module.exports = {
  showError: function(errMsg) {
    var text = document.createTextNode(errMsg);
    var errorElt = CDNInjectorElement.querySelector('#cdn-injector-error');
    errorElt.innerHTML = '';
    errorElt.appendChild(text);
  },

  hideError: function() {
    var errorElt = CDNInjectorElement.querySelector('#cdn-injector-error');
    errorElt.remove();
  },

  attachSubmitListener: function(callback) {
    CDNInjectorElement.addEventListener('load', function() {
      // fixme? will this work more than once?
      var input = CDNInjectorElement.contentDocument.querySelector('#cdn-injector-input');
      var button = CDNInjectorElement.contentDocument.querySelector('#cdn-injector-submit');

      button.addEventListener('mouseup', function(event) {
        callback(input.value);
        input.value = '';
      });
    });
  },

  mount: function(element) {
    document.head.appendChild(CDNStylesElement);
    if (element.hasChildNodes()) {
      element.insertBefore(CDNInjectorElement, element.firstChild);
    } else {
      element.appendChild(CDNInjectorElement);
    }

    CDNInjectorElement.addEventListener('load', function() {
      var closeButton = CDNInjectorElement.contentDocument.querySelector('#cdn-injector-close');
      closeButton.addEventListener('click', module.exports.unmount);
    });
  },

  unmount: function() {
    CDNInjectorElement.remove();
    CDNStylesElement.remove();
  }
};
