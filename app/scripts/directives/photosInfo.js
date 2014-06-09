
var photosInfo = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photos-info.html',
        transclude: true,
        replace: true,
        scope: {
            userName: '@'
        },
        controller: function ($scope, $q, $stateParams, $state, $upload, DataService, toastr) {
            $scope.Photos = [];
            $scope.GalleryId;
            $scope.newGallery = {};

            $scope.files = [];
            $scope.photoData = [];
            var index = 0;

            $scope.delete = function (p, index) {
                DataService.deletePhoto($scope.GalleryId, p.Id).then(function () {
                    $scope.Photos.splice(index, 1);
                });
            };
            $scope.update = function (p) {
                DataService.updateCaption($scope.GalleryId, p.Id, p.Caption).then(function () {
                    toastr.success('Changes have been successfully saved to Db');
                });
            };

            $scope.updateTitle = function () {
                DataService.updateTitle($scope.GalleryId, $scope.newGallery.Title).then(function () {
                    toastr.success('Changes have been successfully saved to Db');
                });
            };
            $scope.onFileSelect = function ($files) {
                $scope.up($files, 0);
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
                }).success(function (data, status, headers, config) {
                    var photo = {
                        Id: data.PhotoId,
                        Caption: 'Picture',
                        FilePath: data.FileName
                    };
                    $scope.GalleryId = data.GalleryId;
                    $scope.Photos.push(photo);
                    $scope.up($files, index + 1);
                });
            };
        }
    };
};
