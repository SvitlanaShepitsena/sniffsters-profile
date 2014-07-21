/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />

var svImage = ($compile, $document) => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-image.html',
        replace: true,
        scope: {
            i: '=',
            index: '=',

            width: '=',
            height: '=',

            onFileSelect: '&'
        },
        controller($scope) {

            var realImageWidth:number, realImageHeight:number, scaledImageWidth:number, scaledImageHeight:number;

            $scope.setInitialImageProp = (width:number, height:number) => {
                $scope.realImageWidth = width;
                $scope.realImageHeight = height;

                $scope.isCropNeeded = ($scope.width < $scope.realImageWidth || $scope.height < $scope.realImageHeight) ? true : false;

            }
            $scope.setScaledImageProp = (width:number) => {
                $scope.scaledImageWidth = width;
                $scope.scaledCoefficient = $scope.scaledImageWidth / $scope.realImageWidth;

                $scope.scaledImageWidth = width;
                $scope.scaledImageHeight = Math.floor($scope.scaledCoefficient * $scope.realImageHeight);

                $scope.scaledCropWidth = Math.floor($scope.scaledCoefficient * parseInt($scope.width));
                $scope.scaledCropHeight = Math.floor($scope.scaledCoefficient * $scope.height);

//                console.log($scope.scaledCropHeight);
            }

        },
        link: (scope, elem, attrs:ng.IAttributes) => {
            scope.cutImage = () => {
                scope.isCropNeeded = false;

            }
            scope.crop = () => {
                scope.cropAccept = true;
                console.log(scope.scaledCropWidth);
                console.log(scope.scaledCropHeight);
                var element = angular.element('<div></div>');

                var startX = 0, startY = 0;
                scope.x = 0;
                scope.y = 0;
                element.css({
                    position: 'absolute',
                    opacity: 0.7,
                    left: '0px',
                    top: '0px',
                    border: '1px solid red',
                    backgroundColor: 'lightgrey',
                    cursor: 'pointer',
                    width: scope.scaledCropWidth + 'px',
                    height: scope.scaledCropHeight + 'px'
                });

                element.on('mousedown', function (event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - scope.x;
                    startY = event.pageY - scope.y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {
                    scope.y = event.pageY - startY;
                    scope.x = event.pageX - startX;
                    if (scope.y < 0) {
                        scope.y = 0;
                    }
                    if (scope.x < 0) {
                        scope.x = 0;
                    }

                    if (scope.x + scope.scaledCropWidth > scope.scaledImageWidth) {
                        scope.x = scope.scaledImageWidth - scope.scaledCropWidth;
                    }

                    if (scope.y + scope.scaledCropHeight > scope.scaledImageHeight) {
                        scope.y = scope.scaledImageHeight - scope.scaledCropHeight;
                    }

                    element.css({
                        top: scope.y + 'px',
                        left: scope.x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
                }


                $compile(element)(scope);

                var imgDiv = elem.find('img').parent();
                imgDiv.append(element);
            }

        }
    }
}
