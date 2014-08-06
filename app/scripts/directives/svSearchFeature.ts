/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svSearchFeature:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-search-feature.html',
        replace: true,
        transclude: true,
        scope: {
            features: '=',
            add: '&'
        },
        controller($scope, $popover, $element) {
            $scope.remove = (key)=> {
                $scope.features.$remove(key);
            }
        },
        link: (scope, element, attrs) => {
        }
    }
}
