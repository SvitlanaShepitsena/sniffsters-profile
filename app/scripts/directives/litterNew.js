
var litterNew = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter-new.html',
        transclude: true,
        replace: true,
        scope: {
            l: '=',
            userName: '@',
            text: '@',
            func: '&'
        },
        controller: function ($scope, $q, DataService, $modal, $upload) {
            $scope.onNewFileSelect = function ($files) {
                $scope.up($files, 0);
            };
            $scope.up = function ($files, index) {
                if (index == $files.length) {
                    return;
                }
                var file = $files[index];
                $upload.upload({
                    url: 'http://localhost:44300/BreederPersonal/AddPictureNewLitter',
                    data: { Title: $scope.l.Title },
                    file: file
                }).progress(function (evt) {
                }).success(function (data, status, headers, config) {
                    var photo = {
                        Id: data.PhotoId,
                        Caption: 'Picture',
                        FilePath: data.FileName
                    };
                    $scope.l.Photos.push(photo);
                    $scope.l.Id = data.GalleryId;
                    $scope.up($files, index + 1);
                });
            };

            $scope.deleteLitterPhoto = function (litterId, photoId, index) {
                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\">Delete this photo?</div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button><button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div></div>",
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
                        DataService.deleteLitterPhoto(litterId, photoId).then(function () {
                            $scope.l.Photos.splice(index, 1);
                        });
                    }
                });
            };

            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.initDate = new Date();
            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[2];
        },
        link: function (scope, element, attrs) {
        }
    };
};
