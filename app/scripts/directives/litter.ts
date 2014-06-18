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

            text: '@',
            func: '&'
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

            $scope.minDate = new Date('2014-01-01')

            $scope.initDate = new Date('2014-01-01');
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
        },

        link: (scope:ILitter, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
