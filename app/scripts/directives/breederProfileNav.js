var breederProfileNav = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/breeder-profile-nav.html',
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
