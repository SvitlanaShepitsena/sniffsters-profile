/// <reference path="../../bower_components/dt-angular/angular.d.ts" />
interface IBreederDetailsEdit extends ng.IScope {
    test:string;
}

var breederDetailsEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/breeder-details-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IBreederDetailsEdit, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
//            SCOPE (USE just {{test}} . )
            scope.test = 'Test from link scope';

// Element
            element.on('mouseover', (e) => {
                element.css({opacity: 0.75});
            });
            element.on('mouseout', (e) => {
                element.css({opacity: 1});
            });
        }
    }
}
