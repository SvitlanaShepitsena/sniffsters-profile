/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/spin/spin.d.ts" />

var svSpinner = () => {

    return{
        restrict: 'E',
        template: '<div id="spinner"><img src="img/loader.gif" class="middle-center"> </div>',
        replace: true,
        scope: {
            radius: '='

        },
        controller($scope) {

        },
        link: (scope, element, attrs) => {

//            var opts = {
//                lines: 15, // The number of lines to draw
//                length: 11, // The length of each line
//                width: 12, // The line thickness
//                radius: scope.radius, // The radius of the inner circle
//                corners: 0.7, // Corner roundness (0..1)
//                rotate: 0, // The rotation offset
//                direction: 1, // 1: clockwise, -1: counterclockwise
//                color: '#4584EE', // #rgb or #rrggbb or array of colors
//                speed: 1, // Rounds per second
//                trail: 100, // Afterglow percentage
//                shadow: false, // Whether to render a shadow
//                hwaccel: false, // Whether to use hardware acceleration
//                className: 'spinner', // The CSS class to assign to the spinner
//                zIndex: 2e9, // The z-index (defaults to 2000000000)
//                top: '10%', // Top position relative to parent
//                left: '50%' // Left position relative to parent
//            };
//            var target = document.getElementById('spinner');
//            var spinner = new Spinner(opts).spin(target);


        }
    }
}
