/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../controllers/HomeCtrl.ts" />

var setterIshome = function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            scope.home.IsSearchHidden = true;
        }
    };
};
