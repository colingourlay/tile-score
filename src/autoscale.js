var debounce = require('debounce');

module.exports = function (selector, width, height, interval) {
  var style = document.createElement('style');

  style.appendChild(document.createTextNode(''));
  document.head.appendChild(style);

  var sheet = style.sheet;

  interval = interval || 250;

  window.onload = rescale;
  window.onresize = debounce(rescale, interval);

  function rescale() {
    var scale = Math.min(1, window.innerWidth / width, window.innerHeight / height);
    var properties = ('transform:scale(' + scale + ');').replace(/(.*)/, '-webkit-$1-ms-$1$1');

    if (sheet.cssRules.length > 0) {
      sheet.deleteRule(0);
    }

    if ('addRule' in sheet) {
      sheet.addRule(selector, properties);
    } else {
      sheet.insertRule(selector + '{' + properties + '}', 0);
    }
  }
};
