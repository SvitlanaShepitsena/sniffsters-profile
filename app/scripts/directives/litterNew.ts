// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />

interface ILitterNew extends ng.IScope {
    test:string;
}

var litterNew:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/litter-new.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            l: '='
        },
        controller: ($scope, $firebase, $q, DataService:DataService, $modal, $upload)=> {
            $scope.files = [];


//            $scope.today = function () {
//                $scope.dt = new Date();
//            };
//            $scope.today();
//
//            $scope.clear = function () {
//                $scope.dt = null;
//            };
//
//
//            $scope.open = function ($event) {
//                $event.preventDefault();
//                $event.stopPropagation();
//
//                $scope.opened = true;
//            };
//            $scope.initDate = new Date();
//            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
//            $scope.format = $scope.formats[2];
        },
        link: (scope:ILitterNew, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
