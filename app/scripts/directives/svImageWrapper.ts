/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svImageWrapper:() => ng.IDirective = () => {

    return{
        link: (scope, element, attrs:ng.IAttributes) => {
            element.on('load', () => {
                scope.$apply(() => {
                    scope.setInitialImageProp(element.width(), element.height());
                    element.addClass('img-responsive');
                    scope.setScaledImageProp(element.width());
//                    console.log(element.width());
                })


//               element.css({width:scope.width})

            })


        }
    }
}
