
var breederProfileNav = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/breeder-profile-nav.html',
        replace: true,
        link: function (scope, element, attrs) {
            scope.showMenu = true;
        }
    };
};
