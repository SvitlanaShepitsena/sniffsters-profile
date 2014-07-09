/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var photoGalleryEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        // replace directive tag with template info
        replace: true,
        controller: function ($scope, $stateParams, $upload, $modal, DataService, toastr) {
            //iterating over arrey of photos of selected gallery
            if ($scope.photosCtrl.SelectedGallery == undefined) {
                var id = $stateParams.id;
                DataService.getGalleries($scope.index.BreederName).then(function (galleries) {
                    $scope.photosCtrl.Galleries = galleries;

                    //                    console.log(galleries);
                    $scope.photosCtrl.SelectedGallery = $scope.photosCtrl.Galleries[id];
                    $scope.photosCtrl.CreateSelectedGalleryClone();
                });
            }
            $scope.photosCtrl.CreateSelectedGalleryClone();

            var index = $stateParams.id;

            $scope.delete = function (p, index, userName) {
                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\"> Delete image from your gallery?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
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
                        DataService.deletePhoto($scope.photosCtrl.SelectedGallery.Id, p.Id, userName).then(function () {
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
                DataService.updateTitle($scope.photosCtrl.SelectedGallery.Id, newTitle, $scope.index.IdFire).then(function () {
                    toastr.success('Changes have been successfully saved to Db');
                });
            };

            $scope.onFileSelect = function ($files) {
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];

                    $scope.upload = $upload.upload({
                        url: 'http://localhost:44300/BreederPersonal/AddPicture',
                        // method: 'POST' or 'PUT',
                        // headers: {'header-key': 'header-value'},
                        // withCredentials: true,
                        data: { gallery: $scope.photosCtrl.SelectedGallery.Id },
                        file: file
                    }).progress(function (evt) {
                        //                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function (data, status, headers, config) {
                        // file is uploaded successfully
                        $scope.photosCtrl.SelectedGallery.Photos.push(data);
                        //                        $scope.myModelObj = {};
                        //                        alert(data);
                    });
                    //.error(...)
                    //.then(success, error, progress);
                    //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
                }
            };
        }
    };
};
