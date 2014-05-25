/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPhotosInfoEdit extends ng.IScope {
    test:string;
}

var photosInfoEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photos-info-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IPhotosInfoEdit, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {



        }
    }
}
