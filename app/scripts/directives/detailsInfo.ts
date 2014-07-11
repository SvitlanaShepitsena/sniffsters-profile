/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IDetailsInfo extends ng.IScope {
    test:string;
}

var detailsInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/details-info.html',
        replace: true,

        link: (scope:IDetailsInfo, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    }
}
