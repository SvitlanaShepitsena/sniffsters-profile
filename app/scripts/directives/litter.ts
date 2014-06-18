/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ILitter extends ng.IScope {
    test:string;
}

var litter:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/litter.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            l: '=',
            userName: '@'
        },
        controller: ($scope)=> {

            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };


            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };


            $scope.initDate = new Date();
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[2];
        },

        link: (scope:ILitter, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
