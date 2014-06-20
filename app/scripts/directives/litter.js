var litter = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter.html',
        transclude: true,
        replace: true,
        scope: {
            l: '=',
            userName: '@'
        },
        controller: function ($scope, DataService, $modal, $upload, toastr) {
            $scope.saveLitter = function () {
                DataService.updateLitter($scope.l).then(function () {
                    toastr.success("Your changes have been saved to the Db.");
                });
            };
            $scope.onFileSelect = function ($files) {
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];

                    $scope.upload = $upload.upload({
                        url: 'http://localhost:44300/BreederPersonal/AddLitterPicture',
                        data: { gallery: $scope.l.Id },
                        file: file
                    }).progress(function (evt) {
                    }).success(function (data, status, headers, config) {
                        $scope.l.Photos.push(data);
                    });
                }
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
