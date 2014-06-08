/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

interface IPhotosInfo extends ng.IScope {
    test:string;
    ctrl:IndexCtrl;
    pnumbers:number;
}

var photosInfo:() => ng.IDirective = () => {

    return{
        restrict: 'E',
        templateUrl: 'views/directives/photos-info.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,

        controller: ($scope, $stateParams, $upload, DataService:DataService, toastr:Toastr) => {
            $scope.newGallery = {};
            $scope.files = [];
            var index = 0;
            $scope.save = () => {
                $scope.up($scope.files, 0);
            }
            $scope.onFileSelect = ($files) => {
                //$files: an array of files selected, each file has name, size, and type.
//                 var file = $files[0];
                $scope.files = $files;
//                $scope.up($files, 0);

            }

            $scope.up = ($files, index) => {
                if (index == $files.length) {
                    return;
                }
                var file = $files[index];
                $upload.upload({
                    url: 'http://localhost:44300/BreederPersonal/AddPictureNewGallery',
                    // method: 'POST' or 'PUT',
                    // headers: {'header-key': 'header-value'},
                    // withCredentials: true,
                    data: {Title: $scope.newGallery.Title},
                    file: file // or list of files: $files for html5 only
                    /* set the file formData name ('Content-Desposition'). Default is 'file' */
                    //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                    /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                    //formDataAppender: function(formData, key, val){}
                }).progress((evt) => {
//                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success((data, status, headers, config) => {
                    $scope.up($files, index + 1);
                    console.log(data);
//                        $scope.photosCtrl.SelectedGallery.Photos.push(data);
//                        $scope.myModelObj = {};
//                        alert(data);
                });
            }

        }
    }
}
