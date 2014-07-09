/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var photosInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photos-info.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            userName: '@',
            newGallery: '='
        },
        controller: function ($scope, $q, $stateParams, $state, $upload, DataService, toastr) {
            var index = 0;
            $scope.newGallery.Photos = [];

            $scope.delete = function (p, index) {
                DataService.deletePhoto($scope.newGallery.Id, p.Id, $scope.userName).then(function () {
                    $scope.newGallery.Photos.splice(index, 1);
                });
            };
            $scope.onFileSelect = function ($files) {
                //$files: an array of files selected, each file has name, size, and type.
                //                 var file = $files[0];
                $scope.up($files, 0);
                //                $scope.up($files, 0);
            };
            $scope.up = function ($files, index) {
                if (index == $files.length) {
                    return;
                }
                var file = $files[index];
                $upload.upload({
                    url: 'http://localhost:44300/BreederPersonal/AddPictureNewGallery',
                    data: { Title: $scope.newGallery.Title },
                    file: file
                }).progress(function (evt) {
                    //                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function (data, status, headers, config) {
                    //                    console.log(data);
                    var photo = {
                        Id: data.PhotoId,
                        Caption: 'Picture',
                        FilePath: data.FileName
                    };
                    $scope.newGallery.Photos.push(photo);
                    $scope.newGallery.Id = data.GalleryId;
                    $scope.up($files, index + 1);
                });
            };
        }
    };
};
