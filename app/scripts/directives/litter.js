/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../services/DataService.ts" />
var litter = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/litter.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            l: '=',
            userName: '@'
        },
        controller: function ($scope, DataService, $modal, $upload, toastr) {
            $scope.onFileSelect = function ($files) {
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];

                    $scope.upload = $upload.upload({
                        url: 'http://localhost:44300/BreederPersonal/AddLitterPicture',
                        // method: 'POST' or 'PUT',
                        // headers: {'header-key': 'header-value'},
                        // withCredentials: true,
                        data: { gallery: $scope.l.Id },
                        file: file
                    }).progress(function (evt) {
                        //                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).success(function (data, status, headers, config) {
                        // file is uploaded successfully
                        $scope.l.Photos.push(data);
                        //                        $scope.myModelObj = {};
                        //                        alert(data);
                    });
                    //.error(...)
                    //.then(success, error, progress);
                    //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
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
        }
    };
};
