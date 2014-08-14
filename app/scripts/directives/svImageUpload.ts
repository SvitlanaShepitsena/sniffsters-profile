/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../models/IBreederProfile.ts" />
/// <reference path="../../bower_components/DefinitelyTyped/underscore/underscore.d.ts" />


var svImageUpload:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/sv-image-upload.html',
        replace: true,
        scope: {
            files: '=',
            childPath: '@',
            closeModal: '&',
            fileSize: '=',
            fireRef: '=',
            height: '=',
            isMult: '=',
            isDragShown: '=',
            isDragHidden: '=',
            mainRef: '=',
            btnTitle: '@',
            okModal: '&',
            show64: '&',
            width: '='
        },
        controller($scope) {

            if (!$scope.isMult) {
                $scope.files = [];

            }


            $scope.onFileSelect = ($files, index?:number) => {

                $files.forEach((file)=> {
                    var reader = new FileReader();
                    if (file.size > $scope.fileSize) {
                        if (_.isUndefined(index)) {
                            $scope.files.push(new SImage(false, file.name));
                        } else {
                            $scope.files[index] = new SImage(false, file.name);
                        }
                    } else {

                        reader.onload = (loadEvent)=> {
                            var file64 = loadEvent.target.result;
                            $scope.$apply(() => {

                                if (_.isUndefined(index)) {
                                    $scope.files.push(new SImage(true, file.name, file64));
                                } else {
                                    $scope.files[index] = new SImage(true, file.name, file64)

                                }
                            });
                        }

                        reader.readAsDataURL(file);
                    }
                })
                $scope.isFileChosen = true;
            }
        },
        link: (scope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes) => {
        }
    };
}
