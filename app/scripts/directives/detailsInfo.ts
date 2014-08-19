/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IDetailsInfo extends ng.IScope {
    test:string;
}

var detailsInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/details-info.html',
        replace: true,

        link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
            scope.home.menuIndex = 4;
            scope.home.url = 'details';
        }

    }
}
