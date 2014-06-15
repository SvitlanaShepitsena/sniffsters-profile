var litters = function () {
  return {
    restrict: 'E',
    templateUrl: 'views/directives/litters.html',
    transclude: true,
    replace: true,
    scope: {
      ctrl: '=',
      text: '@',
      func: '&'
    },
    link: function (scope, element, attrs) {
    }
  };
};