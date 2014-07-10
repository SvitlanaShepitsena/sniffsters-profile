var aboutInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/about-info.html',
        replace: true,
        link: function (scope, element, attrs) {
            scope.home.url = 'about';
        }
    };
};
