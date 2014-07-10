/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../controllers/HomeCtrl.ts" />

var breederProfileNav = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/breeder-profile-nav.html',
        // replace directive tag with template info
        replace: true,
        link: function (scope, element, attrs) {
            scope.showMenu = true;
        }
    };
};
