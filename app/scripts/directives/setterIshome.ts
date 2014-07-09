/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ISetterIshome extends ng.HomeScope {
    test:string;
    home:HomeCtrl;
}

var setterIshome:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        link: (scope:ISetterIshome, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
            scope.home.IsSearchHidden = true;
        }
    }
}
