/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />

var photoGallery = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery.html',
        // replace directive tag with template info
        replace: true,
        controller: function ($scope, $modal, DataService, $stateParams, $state, toastr) {
            $scope.tempPhoto = [];
            var index = 0;

            if ($scope.photosCtrl.SelectedGallery == undefined) {
                var id = $stateParams.id;
                DataService.getGalleries($scope.index.BreederName).then(function (galleries) {
                    $scope.photosCtrl.Galleries = galleries;
                    $scope.photosCtrl.SelectedGallery = $scope.photosCtrl.Galleries[id];
                    //                    console.log($scope.photosCtrl.SelectedGallery.Photos.length)
                });
            }

            $scope.shareGallery = function () {
                DataService.shareGallery($scope.photosCtrl.SelectedGallery.Id).then(function () {
                    //Success
                    $scope.photosCtrl.SelectedGallery.IsShared = true;
                    toastr.success('This gallery is shared.');
                }, function () {
                    //error
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
                            //                        Success
                            //                        1. Delete Gallery from Array
                            var id = $stateParams.id;
                            $scope.photosCtrl.Galleries.splice(id, 1);

                            //                        2. Navigate to List of Galleries
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
