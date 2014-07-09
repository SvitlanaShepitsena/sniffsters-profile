/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var detailsInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/details-info.html',
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
