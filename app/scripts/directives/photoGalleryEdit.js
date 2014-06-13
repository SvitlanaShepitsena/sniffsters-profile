
var photoGalleryEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        replace: true,
        controller: function ($scope, $stateParams, $upload, $modal, DataService, toastr) {
            $scope.photosCtrl.CreateSelectedGalleryClone();

            $scope.tempPhoto = [];
            var index = 0;

            $scope.photosCtrl.SelectedGalleryEdit.Photos.forEach(function (photo) {
                $scope.tempPhoto.push(photo);
                $scope.photosCtrl.SelectedGalleryEdit.Photos.splice(index++, 1);
            });

            $scope.tempPhoto.forEach(function (photo) {
                $scope.photosCtrl.SelectedGalleryEdit.Photos.push(photo);
            });

            var index = $stateParams.id;

            $scope.delete = function (p, index) {
                var modalInstance = $modal.open({
                    templateUrl: 'myModalContent.html',
                    size: 'sm',
                    controller: function ($scope, $modalInstance) {
                        $scope.ok = function () {
                            $modalInstance.close(true);
                        };

                        $scope.cancel = function () {
                            $modalInstance.close(false);
                        };
                    }
                });
                modalInstance.result.then(function (confirmation) {
                    if (confirmation) {
                        DataService.deletePhoto($scope.photosCtrl.SelectedGallery.Id, p.Id).then(function () {
                            $scope.photosCtrl.SelectedGallery.Photos.splice(index, 1);
                        });
                    }
                });
            };

            $scope.update = function (p) {
                DataService.updateCaption($scope.photosCtrl.SelectedGallery.Id, p.Id, p.Caption).then(function () {
                    toastr.success('Changes have been successfully saved to Db');
                });
            };

            $scope.updateTitle = function (newTitle) {
                DataService.updateTitle($scope.photosCtrl.SelectedGallery.Id, newTitle).then(function () {
                    toastr.success('Changes have been successfully saved to Db');
                });
            };

            $scope.onFileSelect = function ($files) {
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];

                    $scope.upload = $upload.upload({
                        url: 'http://localhost:44300/BreederPersonal/AddPicture',
                        data: { gallery: $scope.photosCtrl.SelectedGallery.Id },
                        file: file
                    }).progress(function (evt) {
                    }).success(function (data, status, headers, config) {
                        $scope.photosCtrl.SelectedGallery.Photos.push(data);
                    });
                }
            };
        }
    };
};
