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
        },
        link: (scope:ILitterNew, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
