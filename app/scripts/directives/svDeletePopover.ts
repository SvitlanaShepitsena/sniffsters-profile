/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svDeletePopover = ($popover) => {

    return{
        restrict: 'A',
        link: (scope, element, attrs) => {

            var myPopover = $popover(element, {title: 'My Title', content: 'My Content'});
            console.log(myPopover);
        }
    }
}
