module.exports = angular.module('ngBackground', [])
.directive('ngBackground', function() {
  return {
    restrict : 'A',
    link : function(scope, element, attrs) {
      var change = function(img) {
        if( img ) {
          element.css({
            'background-image': 'url(' + img +')',
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
