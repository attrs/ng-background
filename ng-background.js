module.exports = angular.module('ngBackground', [])
.directive('ngBackground', function() {
  return {
    restrict : 'A',
    link : function(scope, element, attrs) {
      var change = function(img) {
        if( img ) {
          element.css({
            'background-image': 'url(' + img +')'
          });
        } else {
          element.css({
            'background-image': ''
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
