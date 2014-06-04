/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPhotosInfo extends ng.IScope {
    test:string;
    ctrl:IndexCtrl;
    pnumbers:number;
}

var photosInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photos-info.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },

        link: (scope:IPhotosInfo, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
            scope.pnumbers = 0;
       }
    }
}
