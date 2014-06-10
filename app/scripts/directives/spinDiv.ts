/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface ISpinDiv extends ng.IScope {
    test:string;
}

var spinDiv:() => ng.IDirective = () => {

    return {
        restrict: 'E',
        template:'<div class="sp"><i class="fa fa-spinner fa-spin fa-5x"></i></div>'
    };
}
