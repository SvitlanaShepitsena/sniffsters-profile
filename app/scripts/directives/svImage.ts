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

                $scope.isCropNeeded = ( $scope.realImageWidth > $scope.width || $scope.realImageHeight > $scope.height ) ? true : false;

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
//                scope.isCropNeeded = false;
//                console.log('I am herer');
                elem.remove('canvas');
                var canvas = document.createElement('canvas');
                elem.prepend(canvas);

                var context = canvas.getContext('2d');
                var imageObj = new Image();

                imageObj.onload = function () {
                    // draw cropped image
                    var cf = scope.scaledCoefficient;
                    var sourceX = scope.x / cf;
                    var sourceY = scope.y / cf;
                    var sourceWidth = scope.w / cf;
                    var sourceHeight = scope.h / cf;

                    var destWidth = scope.realImageWidth;
                    var destHeight = scope.realImageHeight;

                    var destX = 0;
                    var destY = 0;

                    context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

                    scope.$apply(()=> {
                        scope.i.file64 = canvas.toDataURL('image/jpg');
                        scope.i.isSized = true;
                    })
                };
                scope.cropAccept = false;

                scope.hasBeenCropped = true;
//                    console.log(imageObj);
                imageObj.src = scope.i.file64;
            }
            scope.crop = () => {
                scope.cropAccept = true;
                scope.img = $('#cropme');

                scope.img.Jcrop({
                    onChange: (c:any)=> {
                        scope.x = c.x;
                        scope.y = c.y;
                        scope.w = c.w;
                        scope.h = c.h;
//                        console.log(c);
                    },

                    aspectRatio: scope.width / scope.height
                });
            }
            scope.imgTo64 = (src, outputFormat) => {
                var canvas:any = document.createElement('CANVAS'),
                    ctx = canvas.getContext('2d'),
                    img = new Image;
                img.crossOrigin = 'Anonymous';
                img.onload = function () {
                    var dataURL;
                    canvas.height = img.height;
                    canvas.width = img.width;
                    ctx.drawImage(img, 0, 0);
                    dataURL = canvas.toDataURL(outputFormat);
                    canvas = null;
                    return dataURL;
                };
                img.src = src;


            }

        }
    }
}
