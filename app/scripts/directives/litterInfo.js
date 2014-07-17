/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />

var litterInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter-info.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        controller: function ($scope, $stateParams) {
            var id = $stateParams.id;
            if (!_.isUndefined(_.values($scope.l.photos)[0])) {
                $scope.frontSrc = _.values($scope.l.photos)[0].file64;
            }
        },
        link: function (scope, element, attrs) {
        }
    };
};
