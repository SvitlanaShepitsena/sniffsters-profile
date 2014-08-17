/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svRegisterPopover = ($popover) => {

    return{
        restrict: 'E',
        template: '<button class="sniff-menu btn-link btn menu-modal">REGISTER</button>',
        replace: true,
        controller($scope) {
        },
        link: (scope, element, attrs) => {
            scope.rp = $popover(element, {template: '../../views/modals/register.html', placement: 'bottom', scope: scope});

            scope.$watch('rpShown', (rpShown) => {
                if (rpShown == false) {
                    scope.rp.hide();
                }

            })

        }
    }
}
