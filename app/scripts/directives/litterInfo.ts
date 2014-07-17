/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ILitterInfo extends ng.IScope {
    test:string;
}

var litterInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/litter-info.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        controller: ($scope, $stateParams) => {
            var id = $stateParams.id;
            $scope.frontSrc = _.values($scope.l.photos)[0].file64;
        },

        link: (scope:ILitterInfo, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
