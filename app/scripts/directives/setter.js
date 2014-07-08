/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var setter = function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            scope.home.IsHome = true;
            scope.home.IsSearchHidden = true;
        }
    };
};
