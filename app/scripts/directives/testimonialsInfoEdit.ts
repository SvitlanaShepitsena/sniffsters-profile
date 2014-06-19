/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ITestimonialsInfoEdit extends ng.IScope {
    test:string;
}

var testimonialsInfoEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/testimonials-info-edit.html',
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:ITestimonialsInfoEdit, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {


        }
    }
}
