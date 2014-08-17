/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svRegisterPopover = ($popover) => {

    return{
        restrict: 'E',
        template: '<button class="sniff-menu btn-link btn menu-modal">REGISTER</button>',
        replace: true,
        scope: {
            lpShown: '=',
            rpShown: '='
        },
        controller($scope) {
            $scope.regPop = () => {
                $scope.lpShown = false;
                $scope.rpShown = true;
            }
        },
        link: (scope, element, attrs) => {
            scope.rp = $popover(element, {template: '../../views/register.html', placement: 'bottom'});

            scope.$watch('rpShown', (rpShown) => {
                if (rpShown == false) {
                    scope.rp.hide();
                }

            })

        }
    }
}
