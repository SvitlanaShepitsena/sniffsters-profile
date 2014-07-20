/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />


var svCropCover = ($document) => {

    return{

        link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
            var startX = 0, startY = 0, x = 0, y = 0;
            element.css({
                position: 'absolute',
                opacity: 0.3,
                left: '100px',
                top: '100px',
                border: '1px solid red',
                backgroundColor: 'lightgrey',
                cursor: 'pointer',
                width: scope.scaledCropWidth + 'px',
                height: scope.scaledCropHeight + 'px'
            });

            element.on('mousedown', function (event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }


        }
    }
}
