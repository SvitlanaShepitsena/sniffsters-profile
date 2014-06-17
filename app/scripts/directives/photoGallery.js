var photoGallery = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        replace: true,
        controller: function ($scope, $modal, DataService, $stateParams, $state, toastr) {
            $scope.tempPhoto = [];
            var index = 0;

            if ($scope.photosCtrl.SelectedGallery == undefined) {
                var id = $stateParams.id;
                $scope.photosCtrl.SelectedGallery = $scope.photosCtrl.Galleries[id];
            }

            $scope.photosCtrl.SelectedGallery.Photos.forEach(function (photo) {
                $scope.tempPhoto.push(photo);
                $scope.photosCtrl.SelectedGallery.Photos.splice(index++, 1);
            });

            $scope.tempPhoto.forEach(function (photo) {
                $scope.photosCtrl.SelectedGallery.Photos.push(photo);
            });
            $scope.shareGallery = function () {
                DataService.shareGallery($scope.photosCtrl.SelectedGallery.Id).then(function () {
                    $scope.photosCtrl.SelectedGallery.IsShared = true;
                    toastr.success('This gallery is shared.');
                }, function () {
                });
            };

            $scope.delGallery = function () {
                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\"> Delete this gallery?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
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
                        DataService.deleteGallery($scope.photosCtrl.SelectedGallery.Id).then(function () {
                            var id = $stateParams.id;
                            $scope.photosCtrl.Galleries.splice(id, 1);

                            $state.go('profile.photos2', {});
                        });
                    }
                });
            };
        },
        link: function (scope, element, attrs) {
        }
    };
};
