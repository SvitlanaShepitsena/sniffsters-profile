/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var litterInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter-info.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        controller: function ($scope, $stateParams) {
            var id = $stateParams.id;
        },
        link: function (scope, element, attrs) {
        }
    };
};
