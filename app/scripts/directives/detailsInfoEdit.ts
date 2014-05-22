/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IDetailsInfoEdit extends ng.IScope {
    test:string;
}

var detailsInfoEdit:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/details-info-edit.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',

            text: '@',
            func: '&'
        },
        link: (scope:IDetailsInfoEdit, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {



        }
    }
}
