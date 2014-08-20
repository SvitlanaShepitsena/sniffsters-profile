/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svShare = ($popover, $location) => {

    return {
        restrict: 'E',
        template: '<button class="btn btn-link sniff-head-sm"> Share </button>',
        replace: true,
        controller($scope) {

        },
        link: (scope, element, attrs) => {

            scope.social = $popover(element, {
                template: '../../views/modals/share.html',
                placement: 'top',
                scope: scope
            });
            scope.shareUrl = encodeURIComponent($location.absUrl());


        }
    }
}
