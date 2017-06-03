var $ = angular.element;

function isInView(element) {
  var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var rect = element.getBoundingClientRect();
  if( !rect.width || rect.height <= 2 ) return false;
  return rect.top <= viewportHeight && rect.bottom >= 0;
}

function scan() {
  [].forEach.call(document.querySelectorAll('[ng-background][lazyload]'), function(el) {
    if( isInView(el) ) el.style.backgroundImage = 'url(' + el.getAttribute('ng-background') + ')';
  });
}

module.exports = angular.module('ngBackground', [])
.directive('ngBackground', function() {
  return {
    restrict : 'A',
    link : function(scope, element, attrs) {
      var lazyload = ('lazyload' in attrs && attrs.lazyload != 'false');
      var el = element[0];
      
      var change = function(img) {
        if( img ) {
          if( isInView(el) ) lazyload = false;
          
          element.css({
            'background-image': lazyload ? '' : 'url(' + img +')',
            'background-size': attrs.ngBackgroundSize || 'cover',
            'background-position': attrs.ngBackgroundPosition || 'center',
            'background-repeat': attrs.ngBackgroundRepeat || 'no-repeat'
          });
        } else {
          element.css({
            'background-image': '',
            'background-size': '',
            'background-position': '',
            'background-repeat': ''
          });
        }
      };
      
      attrs.$observe('ngBackground', function(value) {
        change(value);
      });
      
      change(attrs.ngBackground);
    }
  };
});

module.exports.scan = scan;

var observer;
$(window).on('load scroll resize', scan)
.on('load', function() {
  if( window.MutationObserver ) {
    if( observer ) observer.disconnect();
    observer = new MutationObserver(function(mutations) {
      scan();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  } else {
    window.setInterval(scan, 1000);
  }
});