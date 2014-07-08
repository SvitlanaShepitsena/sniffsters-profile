var setter = function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            scope.home.IsHome = true;
            scope.home.IsSearchHidden = true;
        }
    };
};
