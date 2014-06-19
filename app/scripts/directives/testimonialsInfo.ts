/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ITestimonialsInfo extends ng.IScope {
    test:string;
}

var testimonialsInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/testimonials-info.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:ITestimonialsInfo, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
