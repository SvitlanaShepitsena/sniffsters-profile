/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svSlider:() => ng.IDirective = () => {

    return{
        restrict: 'A',
        scope: {
            h: '@'
        },
        link: (scope, element, attrs:ng.IAttributes) => {
            element.slimScroll({height: scope.h + 'px'});
        }
    }
}
