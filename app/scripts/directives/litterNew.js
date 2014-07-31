// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />

var litterNew = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter-new.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            l: '='
        },
        controller: function ($scope, $firebase, $q, DataService, $modal, $upload) {
            $scope.files = [];
        },
        link: function (scope, element, attrs) {
        }
    };
};
