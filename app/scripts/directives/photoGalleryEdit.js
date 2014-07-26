/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
var photoGalleryEdit = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/photo-gallery-edit.html',
        // replace directive tag with template info
        replace: true,
        controller: function ($scope, $modal) {
            $scope.files = [];

            $scope.deletePhoto = function (id) {
                var modalInstance = $modal.open({
                    template: "<div><div class=\"modal-body\"> Delete this photo?</div>" + "<div class=\"modal-footer\">" + "<button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button>" + "<button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button>" + "</div></div>",
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
                        $scope.gallery.$child('Photos').$remove(id);
                    }
                });
            };
        }
    };
};
