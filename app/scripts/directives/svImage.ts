/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />

var svImage:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-image.html',
        replace: true,
        scope: {
            i: '=',
            index: '=',
            width: '=',
            height: '=',
            onFileSelect: '&'
        },
        controller($scope) {

        },
        link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
