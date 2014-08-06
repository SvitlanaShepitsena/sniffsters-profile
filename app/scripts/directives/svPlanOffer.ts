/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svPlanOffer = () => {

    return{
        restrict: 'A',
        scope: {
            popover: '='
        },
        controller($scope) {

        },
        link: (scope, element, attrs) => {
            if (scope.popover) {
                element.on('mouseenter', ()=> {
                    alert('start a plan');
                })
            }


        }
    }
}
