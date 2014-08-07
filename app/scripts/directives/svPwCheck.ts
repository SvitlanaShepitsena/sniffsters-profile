/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svPwCheck = () => {

    return{
        require: 'ngModel',
        link: (scope, elem, attrs, ctrl) => {
            var firstPassword = '#' + attrs.svPwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val() === $(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    }
}
