/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />

var svImageUpload:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-image-upload.html',
        replace: true,
        scope: {
            isMult: '=',
            width: '=',
            height: '=',
            fileSize: '=',
            mainRef: '=',
            isDragShown: '=',
            fireRef: '=',
            btnTitle: '@',
            childPath: '@',
            closeModal: '&',
            okModal: '&',
            show64: '&'
        },
        controller($scope) {
            $scope.files = [];
            $scope.show64();

            $scope.onFileSelect = ($files, index?:number) => {
                var reader = new FileReader();

                $files.forEach((file)=> {
                    if (file.size > $scope.fileSize) {

                        index >= 0 ? $scope.files[index] = new SImage(false, file.name) : $scope.files.push(new SImage(false, file.name));
                    } else {

                        reader.onload = (loadEvent)=> {
                            var file64 = loadEvent.target.result;
                            $scope.$apply(() => {
                                index >= 0 ? $scope.files[index] = new SImage(true, file.name, file64) : $scope.files.push(new SImage(true, file.name, file64));
                            });
                        }

                        reader.readAsDataURL(file);
                    }
                })
            }
        },
        link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    };
}
