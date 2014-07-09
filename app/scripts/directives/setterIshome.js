
var setterIshome = function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            scope.home.IsSearchHidden = true;
        }
    };
};
