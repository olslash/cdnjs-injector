module.exports = {
  injectScripts: function(urls) {
    urls.forEach(function(url) {
      var scriptElement = document.createElement('script');
      scriptElement.setAttribute('src', url);
      document.head.appendChild(scriptElement);
    });
  }
};
